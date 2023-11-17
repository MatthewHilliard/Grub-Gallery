import { useEffect, useState } from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom"
import Axios from "axios"

import React from 'react'

function Recipe({ recipe }) {
    const [activeTab, setActiveTab] = useState('instructions')

  return (
    <DetailWrapper>
        <div>
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt="" style={{ marginRight: '400px' }}/>
        </div>
        <Info>
        
            <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab("instructions")}>Instructions</Button> 
            <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab("ingredients")}>Ingredients</Button>
            {activeTab === 'instructions' && (
                            <div>
                            <h1>Overview:</h1>
                            <h3 dangerouslySetInnerHTML={{ __html: recipe.summary }}></h3>
                            <h1>Instructions:</h1>
                            <h3 dangerouslySetInnerHTML={{ __html: recipe.instructions }}></h3>
                            </div>
            )}
            {activeTab === 'ingredients' &&(
                            <div>{recipe.extendedIngredients.map((ingredient) => (
                                <li key={ingredient.id}>{ingredient.original}</li>
                            ))}</div>
            )}

        </Info>
    </DetailWrapper>
  )
}

export default Recipe


const DetailWrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;
    h2 {
        margin-bottom: 2rem;
    }
`;

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
    &.active {
        background: black;
        color: white;
    }
`;

const Info = styled.div`
margin-left: ${props => (props.activeTab === 'instructions' ? '4rem' : props.activeTab === 'ingredients' ? '-196rem' : '0')};
  padding: 0 2rem; /* Adjust padding as needed */
  h3 {
    font-size: 1.2rem;
  }
  img {
    max-height: 600px;
  }
`;
