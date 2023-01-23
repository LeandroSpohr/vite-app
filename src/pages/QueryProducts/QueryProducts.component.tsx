import React, { useEffect, useState } from 'react'
import { Row } from 'react-grid-system'
import { toast } from 'react-toastify'

import * as ProductService from '../../services/Product'

import ProductInterface from '../../models/interfaces/Product'
import CartInterface from '../../models/interfaces/Cart'

import Typography from '../../components/atoms/Typography'
import Container from '../../components/atoms/Container'
import NumericInput from '../../components/atoms/NumericInput'
import ProductCard from '../../components/molecules/ProductCard'
import {ColWrapper, ContentWrapper} from './QueryProducts.styles'

import { useUser } from '../../context/User'

import { AddIcon } from '../../assets/icons'
import { sizes, colors, margins } from '../../assets/styles/variables'
import Paper from '../../components/atoms/Paper'

const { size150, size30, size50, size10 } = sizes

const QueryProducts = () => {
  const { dispatch } = useUser()
  const [products, setProducts] = useState<CartInterface[]>([])

  const addToCart = (productCart: CartInterface) => {
    dispatch({
      type: 'ADD_PRODUCT_TO_CART',
      payload: productCart,
    })
    toast.success('Produto adicionado ao carrinho!')
  }

  const handleChangeProductQuantity = (productCart: CartInterface, value: string) => {
    const updatedeProducts = products
    const someProductIndex = updatedeProducts.findIndex(cartProduct => cartProduct.product.id === productCart.product.id)
    if (someProductIndex !== -1) {
      updatedeProducts[someProductIndex].quantity = +value
    }

    setProducts([...updatedeProducts])
  }

  useEffect(() => {
    ProductService.getAll()
      .then((response) => {
        const productsCart: CartInterface[] = response.map((product: ProductInterface) => ({
          product,
          quantity: 1,
        }))
        setProducts(productsCart)
      })
  }, [])

  return (
    <Container displayBlock fullHeight>
      <Paper style={{ 
        width: size150, height: size50, padding: size10, backgroundColor: '#6b451ee6',
        borderRadius: '1rem 1rem 0rem 0rem'}}>
        <Typography>Produtos</Typography>
      </Paper>
      <ContentWrapper style={{margin: '0', borderRadius: '0rem 1rem'}}>
        <Row>
          {products.map((productCart) => (
            <ColWrapper lg={2} md={3} sm={4} xs={6} key={'col' + productCart.product.id}>
              <ProductCard
                key={'productCard' + productCart.product.id}
                fluid
                imgUrl={productCart.product.imgUrl}
                imgMaxHeight={size150}
                title={productCart.product.description}
                price={productCart.product.value}
                buttonText={<AddIcon size={size30} />}
                inputQuantity={<NumericInput
                  size={1}
                  min={1}
                  max={15}
                  step={1}
                  value={productCart.quantity}
                  onChange={(event) => handleChangeProductQuantity(productCart, event.target.value)}
                />}
                handleSubmit={() => addToCart(productCart)}
              ></ProductCard>
            </ColWrapper>
          ))}
        </Row>
      </ContentWrapper>
    </Container>
  )
}

export default QueryProducts
