import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { toggleModalAlert } from '../../store/slices/pageActions';
import { createProductData } from '../../store/slices/products';
import ModalAlert from '../pageComp/ModalAlert';

const CreateGaming = () => {
    const dispatch = useDispatch();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const initialValues = {
        name: '',
        description: '',
        newProduct: 'false',  
        CategoryId: 1,
        bestseller: 'false', 
        processor: '',
        RAM: '',
        storage: '',
        GPU: '',
        imageUrl: '',
        price: ''
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required'),
        newProduct: Yup.string().oneOf(['true', 'false']).required('newProduct status is required'),
        bestseller: Yup.string().oneOf(['true', 'false']).required('Bestseller status is required'),
        processor: Yup.string().required('Processor is required'),
        RAM: Yup.number().required('RAM is required'),
        storage: Yup.string().required('Storage is required'),
        GPU: Yup.string().required('GPU is required'),
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
                setSuccessMessage('Gaming product added successfully!');
                resetForm();
                dispatch(toggleModalAlert());
            })
            .catch((error) => {
                setErrorMessage(`Failed to add gaming product: ${error.message}`);
            });
    };

    return (
        <ModalAlert title="Create Gaming Product">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="p-4 h-auto overflow-y-auto space-y-6">
                        <h2 className="text-xl font-semibold mb-4">Add New Gaming Product</h2>
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
                                        name="description"
                                        className="w-full p-2 border rounded-md"
                                        placeholder="Description"
                                    />
                                    <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div>
                                    <label>newProduct:</label>
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
                                    <label>Processor:</label>
                                    <Field
                                        type="text"
                                        name="processor"
                                        className="w-full p-2 border rounded-md"
                                        placeholder="Processor"
                                    />
                                    <ErrorMessage name="processor" component="div" className="text-red-500 text-sm" />
                                </div>
                            </div>
                            <div className='space-y-4 w-full'>
                                <div>
                                    <label>RAM:</label>
                                    <Field
                                        type="number"
                                        name="RAM"
                                        className="w-full p-2 border rounded-md"
                                        placeholder="RAM"
                                    />
                                    <ErrorMessage name="RAM" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div>
                                    <label>Storage:</label>
                                    <Field
                                        type="text"
                                        name="storage"
                                        className="w-full p-2 border rounded-md"
                                        placeholder="Storage"
                                    />
                                    <ErrorMessage name="storage" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div>
                                    <label>GPU:</label>
                                    <Field
                                        type="text"
                                        name="GPU"
                                        className="w-full p-2 border rounded-md"
                                        placeholder="GPU"
                                    />
                                    <ErrorMessage name="GPU" component="div" className="text-red-500 text-sm" />
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

export default CreateGaming;
