import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { toggleModalAlert } from '../../store/slices/pageActions';
import { createProductData } from '../../store/slices/products';
import ModalAlert from '../pageComp/ModalAlert';

const CreatePhone = () => {
    const dispatch = useDispatch();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const initialValues = {
        name: '',
        Description: '',
        newProduct: 'false',  
        CategoryId: 1,
        bestseller: 'false', 
        screen_size: '',
        cpu: '',
        number_of_cores: '',
        Main_camera: '',
        Front_camera: '',
        Battery_capacity: '',
        imageUrl: '',
        price: ''
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        Description: Yup.string().required('Description is required'),
        newProduct: Yup.string().oneOf(['true', 'false']).required('newProduct status is required'),
        bestseller: Yup.string().oneOf(['true', 'false']).required('Bestseller status is required'),
        imageUrl: Yup.string().url('Invalid URL').required('Image URL is required'),
        screen_size: Yup.number().required('Screen size is required'),
        cpu: Yup.string().required('CPU is required'),
        number_of_cores: Yup.number().required('Number of cores is required'),
        Main_camera: Yup.number().required('Main camera is required'),
        Front_camera: Yup.number().required('Front camera is required'),
        Battery_capacity: Yup.string().required('Battery capacity is required'),
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
                setSuccessMessage('Phone added successfully!');
                resetForm();
                dispatch(toggleModalAlert());
            })
            .catch((error) => {
                setErrorMessage(`Failed to add phone: ${error.message}`);
            });
    };

    return (
        <ModalAlert title="Create Phone">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="p-4 h-auto overflow-y-auto space-y-6">
                        <h2 className="text-xl font-semibold mb-4">Add newProduct Phone</h2>
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
                                    <label>Screen size:</label>
                                    <Field
                                        type="number"
                                        name="screen_size"
                                        className="w-full p-2 border rounded-md"
                                        placeholder="Screen size"
                                    />
                                    <ErrorMessage name="screen_size" component="div" className="text-red-500 text-sm" />
                                </div>
                            </div>
                            <div className='space-y-4 w-full'>
                                <div>
                                    <label>CPU:</label>
                                    <Field
                                        type="text"
                                        name="cpu"
                                        className="w-full p-2 border rounded-md"
                                        placeholder="CPU"
                                    />
                                    <ErrorMessage name="cpu" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div>
                                    <label>Number of cores:</label>
                                    <Field
                                        type="number"
                                        name="number_of_cores"
                                        className="w-full p-2 border rounded-md"
                                        placeholder="Number of Cores"
                                    />
                                    <ErrorMessage name="number_of_cores" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div>
                                    <label>Main camera:</label>
                                    <Field
                                        type="number"
                                        name="Main_camera"
                                        className="w-full p-2 border rounded-md"
                                        placeholder="Main camera"
                                    />
                                    <ErrorMessage name="Main_camera" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div>
                                    <label>Front camera:</label>
                                    <Field
                                        type="number"
                                        name="Front_camera"
                                        className="w-full p-2 border rounded-md"
                                        placeholder="Front camera"
                                    />
                                    <ErrorMessage name="Front_camera" component="div" className="text-red-500 text-sm" />
                                </div>
                                <div>
                                    <label>Battery capacity:</label>
                                    <Field
                                        type="text"
                                        name="Battery_capacity"
                                        className="w-full p-2 border rounded-md"
                                        placeholder="Battery capacity"
                                    />
                                    <ErrorMessage name="Battery_capacity" component="div" className="text-red-500 text-sm" />
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

export default CreatePhone;
