'use client'

import { motion } from 'framer-motion'

interface GroceryListProps {
  items: Array<{
    id: number
    name: string
    emoji: string
    category: string
  }>
  onReset: () => void
}

export default function GroceryList({ items, onReset }: GroceryListProps) {
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, typeof items>)

  const handlePrint = () => {
    window.print()
  }

  const handleCopy = () => {
    const text = Object.entries(groupedItems)
      .map(([category, items]) => {
        return `${category}:\n${items.map(item => `  - ${item.name}`).join('\n')}`
      })
      .join('\n\n')

    navigator.clipboard.writeText(text)
    alert('Grocery list copied to clipboard!')
  }

  return (
    <div style={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.card}
      >
        <h1 style={styles.title}>Your Grocery List</h1>
        <p style={styles.subtitle}>for the week</p>

        {items.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>You didn't add any items!</p>
          </div>
        ) : (
          <div style={styles.listContainer}>
            {Object.entries(groupedItems).map(([category, categoryItems]) => (
              <div key={category} style={styles.categorySection}>
                <h2 style={styles.categoryTitle}>{category}</h2>
                <ul style={styles.itemList}>
                  {categoryItems.map((item) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      style={styles.listItem}
                    >
                      <span style={styles.itemEmoji}>{item.emoji}</span>
                      <span style={styles.itemName}>{item.name}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div style={styles.summary}>
          <strong>Total Items: {items.length}</strong>
        </div>

        <div style={styles.buttonContainer}>
          <button onClick={handleCopy} style={styles.button}>
            Copy List
          </button>
          <button onClick={handlePrint} style={styles.button}>
            Print List
          </button>
          <button onClick={onReset} style={{...styles.button, ...styles.resetButton}}>
            Start Over
          </button>
        </div>
      </motion.div>

      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }
          button {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  card: {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    maxWidth: '600px',
    width: '100%',
    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: '5px',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#666',
    textAlign: 'center',
    marginBottom: '30px',
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px',
  },
  emptyText: {
    fontSize: '1.2rem',
    color: '#999',
  },
  listContainer: {
    marginBottom: '30px',
  },
  categorySection: {
    marginBottom: '25px',
  },
  categoryTitle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: '10px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  itemList: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    padding: '12px',
    marginBottom: '8px',
    background: '#f8f9fa',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  itemEmoji: {
    fontSize: '1.5rem',
  },
  itemName: {
    fontSize: '1.1rem',
    color: '#333',
  },
  summary: {
    textAlign: 'center',
    padding: '20px',
    background: '#f0f0f0',
    borderRadius: '10px',
    marginBottom: '20px',
    fontSize: '1.2rem',
    color: '#333',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    padding: '12px 24px',
    fontSize: '1rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    background: '#667eea',
    color: 'white',
    transition: 'all 0.3s',
  },
  resetButton: {
    background: '#764ba2',
  },
}
