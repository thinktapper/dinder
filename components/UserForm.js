import { useState } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
// import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Formik, Form } from 'formik'
import Input from '@/components/Input'
// import ImageUpload from '@/components/ImageUpload'

const UserSchema = Yup.object().shape({
    username: Yup.string().trim().required(),
    image: Yup.string().trim(),
})

const UserForm = ({
    initialValues = null,
    redirectPath = '',
    buttonText = 'Submit',
    onSubmit = () => null,
}) => {
    const router = useRouter()

    const [disabled, setDisabled] = useState(false)

    const handleOnSubmit = async (values = null) => {
        let toastId
        try {
            setDisabled(true)
            toastId = toast.loading('Submitting...')
            // Submit data
            if (typeof onSubmit === 'function') {
                await onSubmit({ ...values })
            }
            toast.success('Successfully submitted', { id: toastId })
            // Redirect user
            if (redirectPath) {
                router.push(redirectPath)
            }
        } catch (err) {
            toast.error('Unable to submit', { id: toastId })
            setDisabled(false)
        }
    }

    const { ...initialFormValues } = initialValues ?? {
        username: '',
        image: '',
    }

    return (
        <div>
            <Formik
                initialValues={initialFormValues}
                validationSchema={UserSchema}
                validateOnBlur={false}
                onSubmit={handleOnSubmit}
            >
                {({ isSubmitting, isValid }) => (
                    <Form className='space-y-8'>
                        <div className='space-y-6'>
                            <Input
                                name='username'
                                type='text'
                                label='Username'
                                placeholder='User Name'
                                disabled={disabled}
                            />
                            <Input
                                name='image'
                                type='url'
                                label='Profile Pic'
                                placeholder='Direct image link'
                                disabled={disabled}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={disabled || !isValid}
                                className="bg-rose-600 text-white py-2 px-6 rounded-md focus:outline-none focus:ring-4 focus:ring-rose-600 focus:ring-opacity-50 hover:bg-rose-500 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-rose-600"
                            >
                                {isSubmitting ? 'Submitting...' : buttonText}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

UserForm.propTypes = {
    initialValues: PropTypes.shape({
        username: PropTypes.string,
        image: PropTypes.string,
    }),
    redirectPath: PropTypes.string,
    buttonText: PropTypes.string,
    onSubmit: PropTypes.func,
}

export default UserForm