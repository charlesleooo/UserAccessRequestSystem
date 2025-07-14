import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from '@/components/ui/checkbox';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Request',
        href: '/create-request',
    },
];

export default function Index(){
    const { auth } = usePage<SharedData>().props;
    
    const [formData, setFormData] = useState({
        name: '',
        department: '',
        company: '',
        date: ''
    });

    // Auto-populate user data and current date
    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        setFormData(prev => ({ 
            ...prev, 
            name: auth.user?.name || '',
            department: auth.user?.department || '', 
            company: auth.user?.company || '', 
            date: currentDate 
        }));
    }, [auth.user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted:', formData);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Request" />
            <div className="w-full mx-auto p-5">
                <form className="space-y-2" onSubmit={handleSubmit}>
                    {/* First Row: Name and Date */}
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-12">
                        <section>
                            <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                                Name
                            </label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}      
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your name"
                            />
                        </section>

                        <section>
                            <label htmlFor="date" className="block text-sm font-bold text-gray-700 mb-2">
                                Date
                            </label>
                            <Input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                readOnly
                                className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </section>
                    </div>

                    {/* Second Row: Company and Department */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <section>
                            <label htmlFor="company" className="block text-sm font-bold text-gray-700 mb-2">
                                Company
                            </label>
                            <Input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                        onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your company"
                            />
                        </section>

                        <section>
                            <label htmlFor="department" className="block text-sm font-bold text-gray-700 mb-2">
                                Department
                            </label>
                            <Input
                                type="text"
                                id="department"
                                name="department"
                                value={formData.department}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your department"
                            />
                        </section>
                    </div>
                    <Button
                        type="submit"
                        className="w-full text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Submit Request
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}