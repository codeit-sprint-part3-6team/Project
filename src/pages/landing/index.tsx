import Header from '@/components/product/landing/Header';
import Main from '@/components/product/landing/Main';
import Footer from '@/components/product/landing/Footer';

export default function LandingPage() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--black)',
      }}
    >
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
