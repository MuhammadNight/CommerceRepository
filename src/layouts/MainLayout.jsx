import React, { useEffect } from 'react'
import Header from '../components/Header'
import Content from '../components/Content'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import { useDispatch } from 'react-redux'
import { fetchProductData } from '../store/slices/products'

const MainLayout = () => {
    const dispatch = useDispatch()
    const urlProduct = "https://commercebase.onrender.com/products"
    useEffect(() => {
        dispatch(fetchProductData(urlProduct))
    }, [])
    return (
        <div className="font-sfpro">
            <Header />
            <Content>
                <Outlet />
            </Content>
            <Footer />
        </div>
    )
}

export default MainLayout
