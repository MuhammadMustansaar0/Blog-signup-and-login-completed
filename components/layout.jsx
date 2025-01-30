"use client"
import Link from "next/link";
import { usePathname } from 'next/navigation';

const navigationItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact-us" },
    { label: "Login", href: "/login" },
    { label: "Signup", href: "/signup" },
];

function Layout({ children }) {
    const pathname = usePathname();
    const isActiveLink = (href) => pathname === href;

const blackLists = ["/login", "/signup"];

const isBlacklist = blackLists.includes(pathname);

if (isBlacklist) {
    return (
        <div>
            {children}
        </div>
    );
}
    
   
    return (
        <div className="min-h-screen flex flex-col">
           
            <nav className="bg-white shadow-lg sticky top-0 w-full py-4 px-6" role="navigation">
                <div className="container mx-auto flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2" aria-label="Home">
                        <span className="text-2xl font-bold text-slate-800">Edu Matrix interlinked</span>
                    </Link>

                    <div className="flex items-center">
                        <div className="flex gap-x-6">
                            {navigationItems.map((item, index) => (
                                <Link 
                                    href={item.href} 
                                    key={index} 
                                    className={`text-slate-700 hover:text-orange-600 transition-colors
                                        ${isActiveLink(item.href) ? 'font-bold text-orange-600' : ''}`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-grow container mx-auto p-6" role="main">
                {children}
            </main>

            <footer className="bg-slate-900 text-white" role="contentinfo">
                <div className="container mx-auto py-12 px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        
                      
                        <div>
                           
                        </div>
                    </div>
                    
                    
                </div>
            </footer>
        </div>
    );
}

export default Layout;