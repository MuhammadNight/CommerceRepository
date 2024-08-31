import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { toggleModalAlert } from '../../store/slices/pageActions';
import { createProductData } from '../../store/slices/products';
import ModalAlert from '../pageComp/ModalAlert';

const CreateCamera = () => {
    const dispatch = useDispatch();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const initialValues = {
        name: '',
        Description: '',
        newProduct: 'false',  
        CategoryId: 3,  // Assuming CategoryId for Cameras is 3
        bestseller: 'false',
        sensor: '',
        resolution: '',
        ISO_range: '',
        imageUrl: '',
        price: ''
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        Description: Yup.string().required('Description is required'),
        newProduct: Yup.string().oneOf(['true', 'false']).required('New Product status is required'),
        bestseller: Yup.string().oneOf(['true', 'false']).required('Bestseller status is required'),
        sensor: Yup.string().required('Sensor type is required'),
        resolution: Yup.number().required('Resolution is required'),
        ISO_range: Yup.string().required('ISO Range is required'),
        imageUrl: Yup.string().url('Invalid URL').required('Image URL is required'),
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
                setSuccessMessage('Camera added successfully!');
                resetForm();
                dispatch(toggleModalAlert());
            })
            .catch((error) => {
                setErrorMessage(`Failed to add camera: ${error.message}`);
            });
    };

    return (
        <ModalAlert title="Create Camera">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="p-4 h-auto overflow-y-auto space-y-6">
                        <h2 className="text-xl font-semibold mb-4">Add new Camera</h2>
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
                                    <label>Sensor:</label>
                                    <Field
                                        type="text"
                                        name="sensor"
                                        className="w-full p-2 border rounded-md"
                                        placeholder="Sensor Type"
                                    />
                                    <ErrorMessage name="sensor" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div>
                                    <label>Resolution:</label>
                                    <Field
                                        type="number"
                                        name="resolution"
                                        className="w-full p-2 border rounded-md"
                                        placeholder="Resolution (in MP)"
                                    />
                                    <ErrorMessage name="resolution" component="div" className="text-red-500 text-sm" />
                                </div>
                            </div>
                            <div className='space-y-4 w-full'>
                                <div>
                                    <label>ISO Range:</label>
                                    <Field
                                        type="text"
                                        name="ISO_range"
                                        className="w-full p-2 border rounded-md"
                                        placeholder="ISO Range"
                                    />
                                    <ErrorMessage name="ISO_range" component="div" className="text-red-500 text-sm" />
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

export default CreateCamera;
