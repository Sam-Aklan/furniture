import { lazy, Suspense, use, useState, useEffect } from 'react'
import ScrollContext from '../lib/ScrollContext'
import { useMotionValueEvent } from 'framer-motion'

type ModelType = 'chair' | 'table' | 'sofa'


  const Chair = lazy(() => import('./Chair'))
  const Table = lazy(() => import('./Table'))
  const Sofa = lazy(() => import('./Sofa'))

const ThreeDModels = () => {
  const { scrollProgress } = use(ScrollContext)
  const [modelDisplayed, setModelDisplayed] = useState<ModelType|null>('chair')
  if (!scrollProgress ) return null
  // Cleanup when component unmounts or model changes
  useEffect(() => {
    
    return () => {
      // Force cleanup by setting component to null
      setModelDisplayed(null)
    }
  }, [])

  const loadModel = async (model: ModelType) => {
    if (model === modelDisplayed) return
    
    // 1. Unmount current model (triggers cleanup)
    setModelDisplayed(null)
    
    // 2. Load new model after a brief delay (lets GC clean up)
    await new Promise(resolve => setTimeout(resolve, 200))
    
    // 3. Set new model
    setModelDisplayed(model)
    // setModelComponent(modelComponents[model])
  }

  // Load/unload models strictly based on scroll
  useMotionValueEvent(scrollProgress, 'change', async(latest) => {
    if (latest < 0.33) {
      if(modelDisplayed !=='chair') await loadModel('chair')}
    else if (latest < 0.66) {
      if(modelDisplayed !=='table') await loadModel('table')}
    else  {
     if(modelDisplayed !=='sofa') await loadModel('sofa')}
  })

  
  

  return (
    <Suspense fallback='loading ...'>
      {modelDisplayed === 'chair' && <Chair dissolveVisible={modelDisplayed ==='chair'} color="#f5cba7"  onFadeOut={()=>{}}/>}
      {modelDisplayed === 'table' && <Table dissolveVisible={modelDisplayed ==='table'} color="#f5cba7"  onFadeOut={()=>{}}/>}
      {modelDisplayed === 'sofa' && <Sofa dissolveVisible={modelDisplayed ==='sofa'} color="#f5cba7" onFadeOut={()=>{}} />}
    </Suspense>
  )
}

export default ThreeDModels