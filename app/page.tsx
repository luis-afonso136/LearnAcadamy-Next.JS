import {
  CardHeader,
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import { Atom, Braces, Code, Coffee } from "lucide-react";

import Image from "next/image";

export default function Home() {
  return (
    <main className="sm:ml-14 p-6">
      <section className="mb-12">
        <div>
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-semibold mb-4 mt-16">
              Learn Fast With Us
            </h1>
            <p className="text-lg">
              Aprenda novas habilidades e amplie seus conhecimentos com nossos
              cursos online.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <Card className="shadow-lg relative">
          <CardContent className="flex items-center">
            {/* Contêiner do Texto - Parte Esquerda */}
            <div className="flex-1">
              <h2 className="text-3xl font-semibold mb-4 mt-4">Sobre Nós</h2>
              <p className="text-lg mb-4">
                Somos uma plataforma dedicada a oferecer cursos práticos e
                inovadores de fácil acesso em todas as áreas. Nós queremos
                capacitar estudantes e profissionais com as habilidades mais
                atuais e demandadas no mercado, através de uma experiência de
                aprendizado acessível e envolvente.
              </p>
            </div>

            {/* Contêiner da Imagem - Parte Direita */}
            <div className="w-1/3 ml-16 mt-8">
              <Image
                src="/images/LearnAcadamy3.preto.png"
                alt="LearnAcademy"
                width={140}
                height={140}
                className="rounded-lg ml-auto mr-auto"
              />
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-3xl font-semibold justify-center text-center mb-6">
              Cursos Populares
            </h2>
          </CardHeader>
          <CardContent>
            <Carousel>
              <CarouselContent>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <Card className="shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg sm:text-xl">
                          <h2>Curso de HTML</h2>
                        </CardTitle>
                        <Code className="w-6 h-6" />
                      </div>
                      <CardDescription>
                        <p>Curso de HTML para iniciantes.</p>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      Neste curso de HTML, você aprenderá os conceitos básicos
                      de estruturação de páginas web. Descubra como criar e
                      organizar conteúdos, incluindo textos, imagens e links,
                      utilizando as tags essenciais do HTML. Ao final, você será
                      capaz de construir páginas web funcionais e bem
                      estruturadas.
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <Card className="shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg sm:text-xl">
                          <h2>Curso de TailwindCSS</h2>
                        </CardTitle>
                        <Braces className="w-6 h-6" />
                      </div>
                      <CardDescription>
                        <p>Curso de TailwindCSS para iniciantes.</p>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      O Curso de TailwindCSS é uma introdução completa ao
                      framework de CSS utilitário mais popular do momento.
                      TailwindCSS permite criar designs rápidos e responsivos
                      com um conjunto de classes simples, mas poderosas, que
                      oferecem controle total sobre a aparência dos seus
                      componentes.
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <Card className="shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg sm:text-xl">
                          <h2>Curso de React</h2>
                        </CardTitle>
                        <Atom className="w-6 h-6" />
                      </div>
                      <CardDescription>
                        <p>Curso de React para iniciantes.</p>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      Neste curso de React, você aprenderá a criar interfaces
                      dinâmicas e interativas utilizando componentes
                      reutilizáveis. Abordaremos os principais conceitos da
                      biblioteca, como estados, props e hooks. Ao final, você
                      estará pronto para desenvolver aplicações web modernas e
                      escaláveis.
                    </CardContent>
                  </Card>
                </CarouselItem>

                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <Card className="shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg sm:text-xl">
                          <h2>Curso de Java</h2>
                        </CardTitle>
                        <Coffee className="w-6 h-6" />
                      </div>
                      <CardDescription>
                        <p>Curso de Java para iniciantes.</p>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      Neste curso de Java, você aprenderá os fundamentos da
                      programação orientada a objetos, incluindo classes,
                      herança e interfaces. Exploraremos a sintaxe da linguagem
                      e estruturas de controle , além de práticas para criar
                      aplicações eficientes. Ao final, você desenvolver
                      desenvolver programas em Java.
                    </CardContent>
                  </Card>
                </CarouselItem>
              </CarouselContent>

              {/* Navegação do carrossel */}
              <CarouselNext className="absolute top-1/2 right-0 transform -translate-y-1/2">
                &#10095;
              </CarouselNext>
              <CarouselPrevious className="absolute top-1/2 left-0 transform -translate-y-1/2">
                &#10094;
              </CarouselPrevious>
            </Carousel>
          </CardContent>
        </Card>
      </section>

      {/* <section className="mb-32 mt-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold">
            Tecnologias Utilizadas
          </h2>
          <p className="">
            Conheça as principais ferramentas e bibliotecas que utilizamos neste
            projeto.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-center items-center">

          <div className="flex flex-col items-center">
            <img
              src="/images/Next.js.png" // URL do logo do Next.js
              alt="Next.js"
              width={150}
              height={150}
              className="object-contain"
            />
            <p className="mt-2 text-sm">Next.js</p>
          </div>


          <div className="flex flex-col items-center">
            <img
              src="https://raw.githubusercontent.com/shadcn/ui/main/apps/www/public/favicon.ico" // URL do logo do shadcn/ui
              alt="shadcn/ui"
              width={90}
              height={90}
              className="object-contain"
            />
            <p className="mt-2 text-sm">shadcn/ui</p>
          </div>


          <div className="flex flex-col items-center">
            <img
              src="/images/betterauth.png" // URL exemplo (substitua com a correta)
              alt="Better Auth"
              width={90}
              height={90}
              className=" object-contain"
            />
            <p className="mt-2 text-sm">Better Auth</p>
          </div>


          <div className="flex flex-col items-center">
            <img
              src="/images/arcjet.svg" // URL do logo do Arcjet (substitua com a correta)
              alt="Arcjet"
              width={170}
              height={170}
              className="object-contain"
            />
            <p className="mt-2 text-sm">Arcjet</p>
          </div>
        </div>
      </section>  */}

      <section className="mb-12">
        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-3xl font-semibold text-center mb-6">
              Melhores Avaliações
            </h2>
          </CardHeader>
          <CardContent>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
              {/* Card 1: React */}
              <Card className="shadow-lg flex flex-col items-center">
                <CardHeader className="text-center">
                  <div className="flex items-center mb-4">
                    <Avatar className="mr-4">
                      <AvatarImage
                        src="https://randomuser.me/api/portraits/men/1.jpg" // Avatar de exemplo
                        alt="Avatar 1"
                      />
                    </Avatar>
                    <div className="text-left">
                      <p>⭐⭐⭐⭐⭐</p>
                      <p>Excelente curso para iniciantes em React!</p>
                    </div>
                  </div>
                  <CardTitle className="text-lg sm:text-xl">
                    <h2>Curso de React</h2>
                  </CardTitle>
                </CardHeader>
              </Card>

              {/* Card 2: JavaScript */}
              <Card className="shadow-lg flex flex-col items-center">
                <CardHeader className="text-center">
                  <div className="flex items-center mb-4">
                    <Avatar className="mr-4">
                      <AvatarImage
                        src="https://randomuser.me/api/portraits/men/2.jpg" // Avatar de exemplo
                        alt="Avatar 2"
                      />
                    </Avatar>
                    <div className="text-left">
                      <p>⭐⭐⭐⭐⭐</p>
                      <p>
                        Curso altamente recomendável para aprender JS do básico
                        ao avançado!
                      </p>
                    </div>
                  </div>
                  <CardTitle className="text-lg sm:text-xl">
                    <h2>Curso de JavaScript</h2>
                  </CardTitle>
                </CardHeader>
              </Card>

              {/* Card 3: HTML & CSS */}
              <Card className="shadow-lg flex flex-col items-center">
                <CardHeader className="text-center">
                  <div className="flex items-center mb-4">
                    <Avatar className="mr-4">
                      <AvatarImage
                        src="https://randomuser.me/api/portraits/women/3.jpg" // Avatar de exemplo
                        alt="Avatar 3"
                      />
                    </Avatar>
                    <div className="text-left">
                      <p>⭐⭐⭐⭐⭐</p>
                      <p>
                        Perfeito para quem deseja entender as bases do
                        desenvolvimento web!
                      </p>
                    </div>
                  </div>
                  <CardTitle className="text-lg sm:text-xl">
                    <h2>Curso de HTML & CSS</h2>
                  </CardTitle>
                </CardHeader>
              </Card>

              {/* Card 4: Node.js */}
              <Card className="shadow-lg flex flex-col items-center">
                <CardHeader className="text-center">
                  <div className="flex items-center mb-4">
                    <Avatar className="mr-4">
                      <AvatarImage
                        src="https://randomuser.me/api/portraits/men/4.jpg" // Avatar de exemplo
                        alt="Avatar 4"
                      />
                    </Avatar>
                    <div className="text-left">
                      <p>⭐⭐⭐⭐⭐</p>
                      <p>
                        Curso excelente para quem deseja aprender Node.js de
                        forma prática!
                      </p>
                    </div>
                  </div>
                  <CardTitle className="text-lg sm:text-xl">
                    <h2>Curso de Node.js</h2>
                  </CardTitle>
                </CardHeader>
              </Card>
            </section>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
