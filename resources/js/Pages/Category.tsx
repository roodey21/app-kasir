import { Category } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import FormCreate from "@/Components/category/form-create";

export default function CategoryPage() {
    return (
        <AuthenticatedLayout>
            <Head title="Tambah Produk" />

            <div className="py-12">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex flex-col-justify-center">
                        <Card className="w-full max-w-sm mx-auto overflow-hidden">
                            <CardHeader className="bg-gray-50">
                                <CardTitle className="font-medium">Tambah Kategori</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <FormCreate handleSuccess={() => { }} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}
