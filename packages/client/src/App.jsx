import React from 'react'
import name from '@more/common'

const Card = React.lazy(() => import('card/Card'));

const App = () => <div>App DEMssO111
  {name}
  <React.Suspense
    fallback={<p>Loading content from app 2...</p>}
  >
    <Card />
  </React.Suspense>
</div>

export default App
