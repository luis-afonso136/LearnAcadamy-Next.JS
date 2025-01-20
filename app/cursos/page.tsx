import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  CardHeader,
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { ArrowBigRight, Code, Search } from "lucide-react";
import { auth } from "../../lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function Cursos() {
  


  const session =  await auth.api.getSession({
    headers: await headers()
  });

  if(!session) {
    return redirect('/')
  }

  return (
    <div className="sm:ml-14 p-4 bg-slate-100">
      {/* Barra de pesquisa */}
      <div className="mb-6">
        <Input placeholder="Buscar curso..." className="w-full sm:w-80" />
      </div>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="text-lg sm:text-xl text-gray-600">
                <h2>Curso de React</h2>
              </CardTitle>
              <Code className="ml-auto w-4 h-4" />
            </div>
            <CardDescription>
              <p>
                Este curso tem como objetivo aprender os fundamentos básicos do
                React.
              </p>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button>
              <ArrowBigRight className="w-4 h-4" />
              Entrar
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="text-lg sm:text-xl text-gray-600">
                <h2>Curso de JavaScript</h2>
              </CardTitle>
              <Code className="ml-auto w-4 h-4" />
            </div>
            <CardDescription>
              <p>
                Este curso tem como objetivo aprender os fundamentos básicos do
                JavaScript.
              </p>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button>
              <ArrowBigRight className="w-4 h-4" />
              Entrar
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="text-lg sm:text-xl text-gray-600">
                <h2>Curso de HTML</h2>
              </CardTitle>
              <Code className="ml-auto w-4 h-4" />
            </div>
            <CardDescription>
              <p>
                Este curso tem como objetivo aprender os fundamentos básicos do
                HTML.
              </p>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button>
              <ArrowBigRight className="w-4 h-4" />
              Entrar
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>

  ) 
}
