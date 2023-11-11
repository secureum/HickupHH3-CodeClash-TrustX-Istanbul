import { PixelMap } from '../components/PixelMap'
import { CssVarsProvider } from '@mui/joy/styles';
import './globals.css';

function Page() {
  return (
    <CssVarsProvider defaultMode="system">
    <PixelMap />
    </CssVarsProvider>
  )
}

export default Page
