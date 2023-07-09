import { useSelector } from "react-redux"
import {Box,Stepper,Step,StepLabel, Button} from '@mui/material'
import {Formik} from "formik"
import { useState } from "react"
import * as yup from 'yup'
import { shades } from "../../theme"
import Shipping from "./Shipping"
import Payment from "./Payment"
import {loadStripe} from '@stripe/stripe-js'

const stripePromise=loadStripe(import.meta.env.VITE_STRIPE_KEY)

const initialValues={
    billingAddress:{
        firstName:"",
        lastName:"",
        country:"",
        street1:"",
        street2:"",
        city:"",
        state:"",
        zipcode:"",
    },
    shippingAddress:{
        isSameAddress: true,
        firstName:"",
        lastName:"",
        country:"",
        street1:"",
        street2:"",
        city:"",
        state:"",
        zipcode:"",
    },
    email:"",
    phoneNumber:"",
}

const checkoutSchema=[
    yup.object().shape({
        billingAddress:yup.object().shape({
            firstName:yup.string().required('required'),
            lastName:yup.string().required('required'),
            country:yup.string().required('required'),
            street1:yup.string().required('required'),
            street2:yup.string(),
            city:yup.string().required('required'),
            state:yup.string().required('required'),
            zipcode:yup.number().required('required'),
        }),
        shippingAddress:yup.object().shape({
            isSameAddress:yup.boolean(),
            firstName:yup.string().when('isSameAddress',{
                is:false,
                then:()=>yup.string().required('required')
            }),
            lastName:yup.string().when('isSameAddress',{
                is:false,
                then:()=>yup.string().required('required')
            }),
            country:yup.string().when('isSameAddress',{
                is:false,
                then:()=>yup.string().required('required')
            }),
            street1:yup.string().when('isSameAddress',{
                is:false,
                then:()=>yup.string().required('required')
            }),
            street2:yup.string(),
            city:yup.string().when('isSameAddress',{
                is:false,
                then:()=>yup.string().required('required')
            }),
            state:yup.string().when('isSameAddress',{
                is:false,
                then:()=>yup.string().required('required')
            }),
            zipcode:yup.number().when('isSameAddress',{
                is:false,
                then:()=>yup.number().required('required')
            }),
        }),
    }),
    yup.object().shape({
        email:yup.string().required('required'),
        phoneNumber:yup.number().required('required'),
    })
]

const Checkout = () => {

    const [aStep,setaStep]=useState(0);
    const cart=useSelector(state=>state.cart.cart)
    const isFirstStep=aStep===0;
    const isSecondStep=aStep===1;

    const handleFormSubmit=async (values,actions)=>{
        const isValid = await checkoutSchema[aStep]
    .validate(values, { abortEarly: false })
    .then(() => true)
    .catch((errors) => {
      actions.setErrors(errors);
      return false;
    });
    if(isValid){
        setaStep(aStep+1);
    }
        if (isFirstStep && values.shippingAddress.isSameAddress) {
            actions.setFieldValue("shippingAddress", {
              ...values.billingAddress,
              isSameAddress: true,
            });
          }
        if(isSecondStep){ 
            makePayment(values);
        }
        actions.setTouched({});
    }
    async function makePayment(values) {
        const stripe = await stripePromise;
        const sendData = {
            data:{
          userName: [values.billingAddress.firstName, values.billingAddress.lastName].join(" "),
          email: values.email,
          products: cart.map(({ id, count }) => ({
            id,
            count,
          })),
        }};
        console.log(sendData)
        const response = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sendData),
        });
        const session = await response.json();
        await stripe.redirectToCheckout({
          sessionId: session.id,
        });
      }

    return (
        <Box width='80%' margin='100px auto'>
            <Stepper activeStep={aStep} sx={{m:'20px 0'}}>
                <Step>
                    <StepLabel>Billing</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Payment</StepLabel>
                </Step>
            </Stepper>
            <Box>
                <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema[aStep]}>
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                    })=>(
                        <form method="post" onSubmit={handleSubmit}>
                            {isFirstStep && (<Shipping values={values} errors={errors} touched={touched} handleBlur={handleBlur} handleChange={handleChange} setFieldValue={setFieldValue} />)}
                            {isSecondStep && (<Payment values={values} errors={errors} touched={touched} handleBlur={handleBlur} handleChange={handleChange} setFieldValue={setFieldValue} />)}
                            <Box display='flex' justifyContent='space-between' gap='50px'>
                                {isSecondStep && (<Button fullWidth color="primary" variant="contained" sx={{backgroundColor:shades.primary[200],boxShadow:'none',padding:'15px 40px',borderRadius:'0',color:'white'}}
                                onClick={()=>setaStep(aStep-1)}
                                >
                                Back
                                </Button>)}
                                <Button fullWidth color="primary" type='submit' variant="contained" sx={{backgroundColor:shades.primary[400],boxShadow:'none',padding:'15px 40px',borderRadius:'0',color:'white'}}
                                >
                                {isFirstStep?'Next':'Place Order'}
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </Box>
    )
}

export default Checkout
