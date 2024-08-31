import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { toggleModalAlert } from '../../store/slices/pageActions';
import { createProductData } from '../../store/slices/products';
import ModalAlert from '../pageComp/ModalAlert';

const CreateHeadphones = () => {
    const dispatch = useDispatch();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const initialValues = {
        name: '',
        Description: '',
        newProduct: 'false',  
        CategoryId: 4,  // Assuming CategoryId for Headphones is 4
        bestseller: 'false',
        battery_life: '',
        noise_canceling: '',
        imageUrl: '',
        price: ''
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        Description: Yup.string().required('Description is required'),
        newProduct: Yup.string().oneOf(['true', 'false']).required('New Product status is required'),
        bestseller: Yup.string().oneOf(['true', 'false']).required('Bestseller status is required'),
        imageUrl: Yup.string().url('Invalid URL').required('Image URL is required'),
        battery_life: Yup.string().required('Battery life is required'),
        noise_canceling: Yup.string().required('Noise canceling feature is required'),
        price: Yup.number().required('Price is required'),
    });

    const handleSubmit = (values, { resetForm }) => {
        const formattedValues = {
            ...values,
            newProduct: values.newProduct === 'true',
            bestseller: values.bestseller === 'true',
        };

        dispatch(createProductData(formattedValues))
            .unwrap()
            .then(() => {
                setSuccessMessage('Headphones added successfully!');
                resetForm();
                dispatch(toggleModalAlert());
            })
            .catch((error) => {
                setErrorMessage(`Failed to add headphones: ${error.message}`);
            });
    };

    return (
        <ModalAlert title="Create Headphones">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="p-4 h-auto overflow-y-auto space-y-6">
                        <h2 className="text-xl font-semibold mb-4">Add new Headphones</h2>
                        {successMessage && <p className="text-green-500">{successMessage}</p>}
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                        <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row gap-6">
                            <div className='space-y-4 w-full'>
                                <div>
                                    <label>Name:</label>
                                    <Field
                                        type="text"
                                        name="name"
                                        className="w-full p-2 border rounded-md"
                                        placeholder="Name"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div>
                                    <label>Description:</label>
                                    <Field
                                        type="text"
                                        name="Description"
                                        className="w-full p-2 border rounded-md"
                                        placeholder="Description"
                                    />
                                    <ErrorMessage name="Description" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div>
                                    <label>New Product:</label>
                                    <Field
                                        as="select"
                                        name="newProduct"
                                        className="w-full p-2 border rounded-md"
                                    >
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </Field>
                                    <ErrorMessage name="newProduct" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div>
                                    <label>Bestseller:</label>
                                    <Field
                                        as="select"
                                        name="bestseller"
                                        className="w-full p-2 border rounded-md"
                                    >
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </Field>
                                    <ErrorMessage name="bestseller" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div>
                                    <label>Image URL:</label>
                                    <Field
                                        type="text"
                                        name="imageUrl"
                                        className="w-full p-2 border rounded-md"
                                        placeholder="Image URL"
                                    />
                                    <ErrorMessage name="imageUrl" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div>
                                    <label>Battery Life:</label>
                                    <Field
                                        type="text"
                                        name="battery_life"
                                        className="w-full p-2 border rounded-md"
                                        placeholder="Battery Life"
                                    />
                                    <ErrorMessage name="battery_life" component="div" className="text-red-500 text-sm" />
                                </div>
                            </div>
                            <div className='space-y-4 w-full'>
                                <div>
                                    <label>Noise Canceling:</label>
                                    <Field
                                        type="text"
                                        name="noise_canceling"
                                        className="w-full p-2 border rounded-md"
                                        placeholder="Noise Canceling"
                                    />
                                    <ErrorMessage name="noise_canceling" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div>
                                    <label>Price:</label>
                                    <Field
                                        type="number"
                                        name="price"
                                        className="w-full p-2 border rounded-md"
                                        placeholder="Price"
                                    />
                                    <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end items-center gap-2 mt-4">
                            <button
                                type="button"
                                onClick={() => dispatch(toggleModalAlert())}
                                className="py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="py-2 px-4 rounded-md bg-green-500 text-white hover:bg-green-600"
                            >
                                Submit
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </ModalAlert>
    );
};

export default CreateHeadphones;
