
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Navbar } from './Navbar';
import { Footer } from './Footer';


export function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Header /> */}
      <Navbar />

      <main className="flex-grow container mx-auto p-4">
        {/* Outlet จะ render คอมโพเนนต์ที่ตรงกับ Route ลูก */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}