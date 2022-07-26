import { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Formik, Form } from 'formik';
import Input from '@/components/Input';

const ListingSchema = Yup.object().shape({
    name: Yup.string().trim().required(),
    endDate: Yup.string().trim().required(),
    voteDate: Yup.string().trim().required(),
    lat: Yup.number().integer().required(),
    long: Yup.number().integer().required(),
    distance: Yup.number().positive().integer().min(1).required(),
});

const ListingForm = ({
    initialValues = null,
    redirectPath = '',
    buttonText = 'Submit',
    onSubmit = () => null,
}) => {
    const router = useRouter();

    const [disabled, setDisabled] = useState(false);

    const handleOnSubmit = async (values = null) => {
        let toastId;
        try {
            setDisabled(true);
            toastId = toast.loading('Submitting...');
            // Submit data
            if (typeof onSubmit === 'function') {
                await onSubmit({ ...values });
            }
            toast.success('Successfully submitted', { id: toastId });
            // Redirect user
            if (redirectPath) {
                router.push(redirectPath);
            }
        } catch (e) {
            toast.error('Unable to submit', { id: toastId });
            setDisabled(false);
        }
    };

    const { ...initialFormValues } = initialValues ?? {
        name: '',
        endDate: '',
        voteDate: '',
        lat: '',
        long: '',
        distance: '',
    };


    return (
        <div>

            <Formik
                initialValues={initialFormValues}
                validationSchema={ListingSchema}
                validateOnBlur={false}
                onSubmit={handleOnSubmit}
            >
                {({ isSubmitting, isValid }) => (
                    <Form className="space-y-8">
                        <div className="space-y-6">
                            <Input
                                name="name"
                                type="text"
                                label="Name"
                                placeholder="e.g. Meal with friends..."
                                disabled={disabled}
                            />

                            <Input
                                name="voteDate"
                                type="date"
                                label="voteDate"
                                disabled={disabled}
                            />

                            <Input
                                name="endDate"
                                type="date"
                                label="End Date"
                                disabled={disabled}
                            />

                            <div className="flex space-x-4">
                                <Input
                                    name="lat"
                                    type="number"
                                    label="Latitude"
                                    placeholder="42"
                                    disabled={disabled}
                                />
                                <Input
                                    name="long"
                                    type="number"
                                    label="Longitude"
                                    placeholder="42"
                                    disabled={disabled}
                                />
                                <Input
                                    name="distance"
                                    type="number"
                                    min="1"
                                    label="Radius"
                                    placeholder="1"
                                    disabled={disabled}
                                />
                            </div>
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

ListingForm.propTypes = {
    initialValues: PropTypes.shape({
        name: PropTypes.string,
        endDate: PropTypes.string,
        voteDate: PropTypes.string,
        lat: PropTypes.number,
        long: PropTypes.number,
        distance: PropTypes.number,
    }),
    redirectPath: PropTypes.string,
    buttonText: PropTypes.string,
    onSubmit: PropTypes.func,
};

export default ListingForm;