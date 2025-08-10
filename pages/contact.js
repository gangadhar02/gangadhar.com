import Head from 'next/head'
import React from 'react'
import { Box } from '../components/Box'
import Toast from '../components/Toast'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import { cn } from '../lib/utils'
import { motion } from 'framer-motion'

export async function getStaticProps() {
  const meta = {
    title: 'Contact // Gangadhar S',
    tagline: 'Let\'s connect! Email, call, or reach out on social.',
    image: '/static/images/avatar.jpg',
    primaryColor: 'cyan',
    secondaryColor: 'green',
  }

  return { props: meta }
}

function Contact(props) {
  const { title, image } = props
  const description = `<strong>I love chatting</strong> with software engineers, tech founders, students, and geeks. I promise that I'll try to reply to your email in a timely manner.`
  const [isEmailSent, setIsEmailSent] = React.useState(undefined)
  const [showToast, setShowToast] = React.useState(false)

  const onSendEmail = async e => {
    e.preventDefault()

    try {
      const isProd = process.env.NODE_ENV === 'production'
      const base = isProd
        ? 'https://www.parthdesai.site'
        : 'http://localhost:3000'

      await fetch(`${base}/api/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: e.target.name.value,
          email: e.target.email.value,
          message: e.target.message.value,
        }),
      })

      setIsEmailSent(true)
      setShowToast(true)
    } catch (e) {
      console.error(e)
      setIsEmailSent(false)
      setShowToast(true)
    }
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://parthdesai.site/contact" property="og:url" />
        <meta content={`https://parthdesai.site${image}`} property="og:image" />
      </Head>

      <Box>
        <p>Rajajinagar, Bengaluru<br />
        <a href="mailto:sgangadhar.exe@gmail.com">sgangadhar.exe@gmail.com</a><br />
        <a href="tel:6302966383">6302966383</a><br />
        <a href="https://www.linkedin.com/in/gangadhar02/" target="_blank">LinkedIn</a> | 
        <a href="https://x.com/gangadhar__s" target="_blank">X</a> | 
        <a href="https://www.instagram.com/gangadhar__s/" target="_blank">Instagram</a> | 
        <a href="https://sgangadhar.carrd.co/" target="_blank">Personal Site</a>
        </p>
        <h2>Send me an email</h2>
        <Form onSubmit={onSendEmail}>
          {[
            {
              label: 'Name',
              id: 'name',
              type: 'text',
              placeholder: 'James Bond',
              component: Input,
              required: true,
            },
            {
              label: 'Email',
              id: 'email',
              type: 'email',
              placeholder: 'james@bond.com',
              component: Input,
              required: true,
            },
            {
              label: 'Message',
              id: 'message',
              placeholder: 'How can I help you?',
              component: Textarea,
              rows: 4,
              required: true,
            },
          ].map((field, idx) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: idx * 0.08,
                duration: 0.5,
                type: 'spring',
                stiffness: 60,
              }}
            >
              <FormGroup>
                <Label htmlFor={field.id}>{field.label}</Label>
                <field.component
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  rows={field.rows}
                  required={field.required}
                />
              </FormGroup>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 3 * 0.08,
              duration: 0.5,
              type: 'spring',
              stiffness: 60,
            }}
          >
            <FormGroup>
              <Button type="submit">Send</Button>
            </FormGroup>
          </motion.div>
        </Form>

        <Toast
          title={isEmailSent ? 'Email sent :D' : 'Error :('}
          description={
            isEmailSent
              ? 'Thanks for taking the time to write it.'
              : 'Something wrong happened. Try again later.'
          }
          isSuccess={isEmailSent}
          showToast={showToast}
          setShowToast={setShowToast}
        />
      </Box>
    </>
  )
}

const Form = ({ className, ...props }) => (
  <form className={cn(
    "flex flex-col max-w-[400px]",
    className
  )} {...props} />
)

const FormGroup = ({ className, ...props }) => (
  <div className={cn(
    "flex flex-col mb-[10px]",
    className
  )} {...props} />
)

const Label = ({ className, ...props }) => (
  <label className={cn(
    "text-secondary uppercase text-xs font-medium",
    className
  )} {...props} />
)

const Input = ({ className, ...props }) => (
  <input className={cn(
    "text-primary bg-none border border-secondary rounded-md p-[10px]",
    "focus:outline-none focus:border-cyan",
    className
  )} {...props} />
)

const Textarea = ({ className, ...props }) => (
  <textarea className={cn(
    "text-primary bg-none border border-secondary rounded-md p-[10px]",
    "focus:outline-none focus:border-cyan",
    className
  )} {...props} />
)

const Button = ({ className, ...props }) => (
  <button className={cn(
    "text-background bg-white border border-white rounded-md cursor-pointer",
    "p-[10px] mt-[5px] transition-all duration-200 ease-in-out",
    "hover:bg-transparent hover:border-cyan hover:text-cyan",
    "focus:bg-transparent focus:border-cyan focus:text-cyan focus:outline-none",
    className
  )} {...props} />
)

Contact.Layout = Base

export default Contact
