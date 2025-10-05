'use client'

import { useState } from 'react'
import FoodCard from './components/FoodCard'
import GroceryList from './components/GroceryList'

const foodItems = [
  { id: 1, name: 'Apples', emoji: '🍎', category: 'Fruits' },
  { id: 2, name: 'Bananas', emoji: '🍌', category: 'Fruits' },
  { id: 3, name: 'Carrots', emoji: '🥕', category: 'Vegetables' },
  { id: 4, name: 'Broccoli', emoji: '🥦', category: 'Vegetables' },
  { id: 5, name: 'Chicken Breast', emoji: '🍗', category: 'Protein' },
  { id: 6, name: 'Salmon', emoji: '🐟', category: 'Protein' },
  { id: 7, name: 'Milk', emoji: '🥛', category: 'Dairy' },
  { id: 8, name: 'Eggs', emoji: '🥚', category: 'Protein' },
  { id: 9, name: 'Bread', emoji: '🍞', category: 'Bakery' },
  { id: 10, name: 'Pasta', emoji: '🍝', category: 'Grains' },
  { id: 11, name: 'Rice', emoji: '🍚', category: 'Grains' },
  { id: 12, name: 'Tomatoes', emoji: '🍅', category: 'Vegetables' },
  { id: 13, name: 'Cheese', emoji: '🧀', category: 'Dairy' },
  { id: 14, name: 'Yogurt', emoji: '🥛', category: 'Dairy' },
  { id: 15, name: 'Spinach', emoji: '🥬', category: 'Vegetables' },
  { id: 16, name: 'Strawberries', emoji: '🍓', category: 'Fruits' },
  { id: 17, name: 'Oranges', emoji: '🍊', category: 'Fruits' },
  { id: 18, name: 'Potatoes', emoji: '🥔', category: 'Vegetables' },
  { id: 19, name: 'Ground Beef', emoji: '🥩', category: 'Protein' },
  { id: 20, name: 'Avocado', emoji: '🥑', category: 'Fruits' },
]

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [groceryList, setGroceryList] = useState<typeof foodItems>([])
  const [showList, setShowList] = useState(false)

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setGroceryList([...groceryList, foodItems[currentIndex]])
    }

    if (currentIndex < foodItems.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setShowList(true)
    }
  }

  const handleReset = () => {
    setCurrentIndex(0)
    setGroceryList([])
    setShowList(false)
  }

  if (showList) {
    return <GroceryList items={groceryList} onReset={handleReset} />
  }

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <h1 style={styles.title}>Food Swipe</h1>
        <p style={styles.subtitle}>Swipe right to add to your grocery list</p>

        <div style={styles.counter}>
          {currentIndex + 1} / {foodItems.length}
        </div>

        <div style={styles.cardContainer}>
          {currentIndex < foodItems.length && (
            <FoodCard
              food={foodItems[currentIndex]}
              onSwipe={handleSwipe}
            />
          )}
        </div>

        <div style={styles.instructions}>
          <div style={styles.instructionItem}>
            <span style={styles.leftArrow}>←</span>
            <span>Skip</span>
          </div>
          <div style={styles.instructionItem}>
            <span>Add to List</span>
            <span style={styles.rightArrow}>→</span>
          </div>
        </div>

        <div style={styles.listPreview}>
          <strong>Items in list: {groceryList.length}</strong>
        </div>
      </div>
    </main>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  main: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  container: {
    textAlign: 'center',
    width: '100%',
    maxWidth: '500px',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '10px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: '20px',
  },
  counter: {
    fontSize: '1rem',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: '20px',
  },
  cardContainer: {
    height: '500px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  instructions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    padding: '0 20px',
    color: 'white',
  },
  instructionItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '1.1rem',
  },
  leftArrow: {
    fontSize: '2rem',
  },
  rightArrow: {
    fontSize: '2rem',
  },
  listPreview: {
    marginTop: '30px',
    padding: '15px',
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '10px',
    color: 'white',
    fontSize: '1.1rem',
  },
}
