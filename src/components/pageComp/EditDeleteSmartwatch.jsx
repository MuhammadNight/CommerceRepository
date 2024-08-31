import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toggleModalAlert, setSelectProductId, setModalType } from '../../store/slices/pageActions';
import { deleteProductData, fetchProductData } from '../../store/slices/products';
import ModalAlert from './ModalAlert';
import { updateSmartwatchData } from '../../store/slices/SmartwatchSlice';

const EditDeleteSmartwatch = () => {
    const dispatch = useDispatch();
    const { selectProductId, modalType } = useSelector(state => state.pageActions);
    const products = useSelector(state => state.product.products);
    const selectedProduct = products.find(product => product.id === selectProductId);

    if (!selectedProduct) {
        return <div>Product not found</div>;
    }

    const initialValues = {
        name: selectedProduct.name || '',
        Description: selectedProduct.Description || '',
        newProduct: selectedProduct.newProduct ? 'true' : 'false',
        bestseller: selectedProduct.bestseller ? 'true' : 'false',
        battery_life: selectedProduct.battery_life || '',
        compatibility: selectedProduct.compatibility || '',
        imageUrl: selectedProduct.imageUrl || '',
        price: selectedProduct.price || ''
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        Description: Yup.string().required('Description is required'),
        newProduct: Yup.string().oneOf(['true', 'false']).required('NewProduct status is required'),
        bestseller: Yup.string().oneOf(['true', 'false']).required('Bestseller status is required'),
        battery_life: Yup.string().required('Battery life is required'),
        compatibility: Yup.string().required('Compatibility is required'),
        imageUrl: Yup.string().url('Invalid URL').required('Image URL is required'),
        price: Yup.number().required('Price is required'),
    });

    const handleUpdate = (values) => {
        const updatedValues = {
            ...values,
            newProduct: values.newProduct === 'true',
            bestseller: values.bestseller === 'true',
        };

        console.log("Updated Values:", updatedValues); 

        dispatch(updateSmartwatchData({ id: selectProductId, ...updatedValues }))
            .then(() => {
                dispatch(fetchProductData('https://commercebase.onrender.com/products'));
                dispatch(toggleModalAlert());
            })
            .catch((error) => {
                console.error("Error updating product:", error);
            });
    };

    const handleDelete = () => {
        dispatch(deleteProductData(selectProductId))
            .then(() => {
                dispatch(fetchProductData('https://commercebase.onrender.com/products'));
                dispatch(toggleModalAlert());
            })
            .catch((error) => {
                console.error("Error deleting product:", error);
            });
    };

    return (
        <ModalAlert title={modalType === "update" ? "Edit Smartwatch" : "Confirm Deletion"}>
            {modalType === "update" ? (
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleUpdate}
                >
                    {({ isSubmitting }) => (
                        <Form className="p-4">
                            <h2 className="text-xl font-semibold mb-4">Edit Smartwatch Details</h2>
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
                                        <label>New:</label>
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
                                        <label>Battery Life:</label>
                                        <Field
                                            type="text"
                                            name="battery_life"
                                            className="w-full p-2 border rounded-md"
                                            placeholder="Battery Life"
                                        />
                                        <ErrorMessage name="battery_life" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div>
                                        <label>Compatibility:</label>
                                        <Field
                                            type="text"
                                            name="compatibility"
                                            className="w-full p-2 border rounded-md"
                                            placeholder="Compatibility"
                                        />
                                        <ErrorMessage name="compatibility" component="div" className="text-red-500 text-sm" />
                                    </div>
                                </div>
                                <div className='space-y-4 w-full'>
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
                                    Update
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            ) : (
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-4">Do you want to delete this smartwatch?</h2>
                    <div className="flex justify-end items-center gap-2 mt-4">
                        <button
                            onClick={() => dispatch(toggleModalAlert())}
                            className="py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            className="py-2 px-4 rounded-md bg-red-500 text-white hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </ModalAlert>
    );
};

export default EditDeleteSmartwatch;
