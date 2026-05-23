import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../lib/auth";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  ShieldCheck, 
  User as UserIcon,
  ChevronRight
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) redirect("/");

    return (
        <div className="flex min-h-screen bg-slate-50/50">
            {/* --- SIDEBAR (Desktop) --- */}
            <aside className="w-64 border-r bg-white hidden md:flex flex-col p-6 gap-8">
                <div className="font-bold text-xl tracking-tighter flex items-center gap-2">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white text-xs">N</div>
                    Naufal Project
                </div>
                
                <nav className="flex flex-col gap-2 flex-1">
                    <Button variant="secondary" className="justify-start gap-3">
                        <LayoutDashboard size={18} /> Dashboard
                    </Button>
                    <Button variant="ghost" asChild className="justify-start gap-3">
                        <Link href="/products"><Package size={18} /> Products</Link>
                    </Button>
                    {session.user.role === "ADMIN" && (
                        <Button variant="ghost" asChild className="justify-start gap-3">
                            <Link href="/admin"><ShieldCheck size={18} /> Admin Panel</Link>
                        </Button>
                    )}
                </nav>

                <div className="pt-4 pl-16 border-t">
                    <LogoutButton />
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 p-8">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        
                        <p className="text-muted-foreground">Selamat datang kembali, {session.user.name.split(' ')[0]}!</p>
                    </div>
                    <Avatar className="h-10 w-10 border">
                        <AvatarImage src={session.user.image} />
                        <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Profile Card - Sekarang jadi bagian dari Grid */}
                    <Card className="md:col-span-1 shadow-sm overflow-hidden border-none ring-1 ring-slate-200">
                        <div className="h-20 bg-gradient-to-r from-slate-900 to-slate-700" />
                        <CardContent className="relative pt-0 flex flex-col items-center">
                            <Avatar className="h-20 w-20 -mt-10 border-4 border-white shadow-md">
                                <AvatarImage src={session.user.image} />
                                <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="mt-4 text-center">
                                <h3 className="font-bold text-lg">{session.user.name}</h3>
                                <Badge variant="outline" className="mt-1 text-[10px] uppercase font-mono">
                                    {session.user.role}
                                </Badge>
                                <p className="text-xs text-muted-foreground mt-2">{session.user.email}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Stats / Action Card */}
                    <Card className="md:col-span-2 shadow-sm border-none ring-1 ring-slate-200">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">Informasi Akun</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg group hover:bg-slate-100 transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-white rounded-md shadow-sm border"><UserIcon size={16}/></div>
                                    <div className="text-sm">Edit Profile</div>
                                </div>
                                <ChevronRight size={16} className="text-muted-foreground group-hover:translate-x-1 transition-transform"/>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg group hover:bg-slate-100 transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-white rounded-md shadow-sm border"><Settings size={16}/></div>
                                    <div className="text-sm">Account Settings</div>
                                </div>
                                <ChevronRight size={16} className="text-muted-foreground group-hover:translate-x-1 transition-transform"/>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}