'use client'

import { useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

interface FoodCardProps {
  food: {
    id: number
    name: string
    emoji: string
    category: string
  }
  onSwipe: (direction: 'left' | 'right') => void
}

export default function FoodCard({ food, onSwipe }: FoodCardProps) {
  const [exitX, setExitX] = useState(0)
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-25, 25])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])

  const handleDragEnd = (_: any, info: any) => {
    if (Math.abs(info.offset.x) > 100) {
      setExitX(info.offset.x > 0 ? 500 : -500)
      onSwipe(info.offset.x > 0 ? 'right' : 'left')
    }
  }

  return (
    <motion.div
      style={{
        x,
        rotate,
        opacity,
        position: 'absolute',
        width: '350px',
        height: '450px',
        cursor: 'grab',
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={{ x: exitX }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      whileTap={{ cursor: 'grabbing' }}
    >
      <div style={styles.card}>
        <div style={styles.emojiContainer}>
          <span style={styles.emoji}>{food.emoji}</span>
        </div>
        <h2 style={styles.foodName}>{food.name}</h2>
        <p style={styles.category}>{food.category}</p>

        <motion.div
          style={{
            ...styles.overlay,
            ...styles.leftOverlay,
            opacity: useTransform(x, [-200, 0], [1, 0]),
          }}
        >
          <span style={styles.overlayText}>SKIP</span>
        </motion.div>

        <motion.div
          style={{
            ...styles.overlay,
            ...styles.rightOverlay,
            opacity: useTransform(x, [0, 200], [0, 1]),
          }}
        >
          <span style={styles.overlayText}>ADD</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    width: '100%',
    height: '100%',
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    userSelect: 'none',
  },
  emojiContainer: {
    marginBottom: '20px',
  },
  emoji: {
    fontSize: '150px',
  },
  foodName: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  category: {
    fontSize: '1.2rem',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  leftOverlay: {
    background: 'rgba(255, 100, 100, 0.8)',
  },
  rightOverlay: {
    background: 'rgba(100, 255, 100, 0.8)',
  },
  overlayText: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: 'white',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  },
}
