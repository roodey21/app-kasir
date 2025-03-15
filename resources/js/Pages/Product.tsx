import { Category } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Search } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Head } from "@inertiajs/react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import FormCreate from "@/Components/product/form-create";

export default function ProductPage({ categories }: { categories: Category[] }) {
    return (
        <AuthenticatedLayout>
            <Head title="Tambah Produk" />

            <div className="py-12">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex flex-col-justify-center">
                        <Card className="w-full max-w-sm mx-auto overflow-hidden">
                            <CardHeader className="bg-gray-50">
                                <CardTitle className="font-medium">Tambah Produk</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <FormCreate categories={categories} handleSuccess={() => { }} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}
