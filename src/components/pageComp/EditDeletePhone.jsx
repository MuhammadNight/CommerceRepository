import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toggleModalAlert, setSelectProductId, setModalType } from '../../store/slices/pageActions';
import { deleteProductData, fetchProductData } from '../../store/slices/products';
import ModalAlert from './ModalAlert';
import { updatePhoneData } from '../../store/slices/PhoneSlice';

const EditDeletePhone = () => {
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
        screen_size: selectedProduct.screen_size || '',
        cpu: selectedProduct.cpu || '',
        CategoryId: selectedProduct.CategoryId,
        number_of_cores: selectedProduct.number_of_cores || '',
        Main_camera: selectedProduct.Main_camera || '',
        Front_camera: selectedProduct.Front_camera || '',
        Battery_capacity: selectedProduct.Battery_capacity || '',
        imageUrl: selectedProduct.imageUrl || '',
        price: selectedProduct.price || ''
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        Description: Yup.string().required('Description is required'),
        newProduct: Yup.string().oneOf(['true', 'false']).required('NewProduct status is required'),
        bestseller: Yup.string().oneOf(['true', 'false']).required('Bestseller status is required'),
        imageUrl: Yup.string().url('Invalid URL').required('Image URL is required'),
        screen_size: Yup.string().required('Screen size is required'),
        cpu: Yup.string().required('CPU is required'),
        number_of_cores: Yup.number().required('Number of cores is required'),
        Main_camera: Yup.number().required('Main camera is required'),
        Front_camera: Yup.number().required('Front camera is required'),
        Battery_capacity: Yup.string().required('Battery capacity is required'),
        price: Yup.number().required('Price is required'),
    });

    const handleUpdate = (values) => {
        const updatedValues = {
            ...values,
            newProduct: values.newProduct === 'true',
            bestseller: values.bestseller === 'true',
        };

        console.log("Updated Values:", updatedValues); 

        dispatch(updatePhoneData({ id: selectProductId, ...updatedValues }))
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
        <ModalAlert title={modalType === "update" ? "Edit Phone" : "Confirm Deletion"}>
            {modalType === "update" ? (
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleUpdate}
                >
                    {({ isSubmitting }) => (
                        <Form className="p-4">
                            <h2 className="text-xl font-semibold mb-4">Edit Phone Details</h2>
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
                                            type="text"
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
                                    Update
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            ) : (
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-4">Do you want to delete this phone?</h2>
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

export default EditDeletePhone;
