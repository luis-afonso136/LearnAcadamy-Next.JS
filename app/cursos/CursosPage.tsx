"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { ArrowBigRight, Edit, Edit2, PlusCircle, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Skeleton } from "../../components/ui/skeleton";
import { toast } from "../../hooks/use-toast";
import Link from "next/link";

interface Course {
  id?: number;
  name: string;
  description: string;
  difficulty: string;
  category: string;
  image: string; // Novo campo para o ícone
  questions: {
    question: string;
    correctAnswer: string;
    wrongAnswers: string[];
  }[];
}

interface User {
  id: string;
  name: string;
}

interface CursosPageProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export default function CursosPage({ user }: CursosPageProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [newCourse, setNewCourse] = useState<Course>({
    name: "",
    description: "",
    difficulty: "",
    category: "",
    questions: [],
    image: "",
  });

  const [newQuestion, setNewQuestion] = useState({
    question: "",
    correctAnswer: "",
    wrongAnswers: ["", ""],
  });

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("http://localhost:3001/courses");
      const data = await response.json();
      setCourses(data);
      setFilteredCourses(data);
      setLoading(false);
    };
    fetchCourses();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(
        courses.filter((course) =>
          course.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  const validateCourse = () => {
    if (
      !newCourse.name ||
      !newCourse.category ||
      !newCourse.difficulty ||
      !newCourse.description ||
      !newCourse.image
    ) {
      toast({
        title: "Erro ao adicionar curso",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleAddCourse = async () => {
    if (!validateCourse()) return;

    try {
      const response = await fetch("http://localhost:3001/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse), // Certifique-se de que `newCourse` inclui `icon`
      });

      if (response.ok) {
        const createdCourse = await response.json();
        setCourses([...courses, createdCourse]);
        setFilteredCourses([...courses, createdCourse]);
        toast({
          title: "Curso criado com sucesso!",
          description: `O curso "${createdCourse.name}" foi adicionado.`,
        });
        setIsDialogOpen(false);
        setNewCourse({
          name: "",
          description: "",
          difficulty: "",
          category: "",
          questions: [],
          image: "",
        });
      } else {
        toast({
          title: "Erro ao criar curso",
          description:
            "Ocorreu um erro ao tentar criar o curso. Tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro de rede",
        description:
          "Não foi possível se conectar ao servidor. Verifique sua conexão.",
        variant: "destructive",
      });
    }
  };

  const handleAddQuestion = () => {
    setNewCourse({
      ...newCourse,
      questions: [
        ...newCourse.questions,
        {
          ...newQuestion,
        },
      ],
    });
    setNewQuestion({
      question: "",
      correctAnswer: "",
      wrongAnswers: ["", ""],
    });
  };

  const router = useRouter();

  return (
    <div className="min-h-screen p-4 sm:ml-14">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full sm:w-80">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <Input
            placeholder="Buscar curso..."
            className="w-full pl-10 dark:border-slate-700"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              {(user.email.includes("@professor") ||
                user.email.includes("@admin")) && (
                <Button>
                  <PlusCircle className="w-4 h-4" />
                  Adicionar Curso
                </Button>
              )}
            </DialogTrigger>
            <DialogContent className="max-w-5xl">
              {" "}
              <DialogHeader>
                <DialogTitle>Adicionar Novo Curso</DialogTitle>
              </DialogHeader>
              <div className="flex gap-8">
                <div className="w-1/2 flex flex-col gap-4">
                  <div>
                    <label
                      htmlFor="course-name"
                      className="block text-sm font-medium mb-1"
                    >
                      Nome do Curso
                    </label>
                    <Input
                      id="course-name"
                      placeholder="Nome do Curso"
                      value={newCourse.name}
                      onChange={(e) =>
                        setNewCourse({ ...newCourse, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="course-description"
                      className="block text-sm font-medium mb-1"
                    >
                      Descrição
                    </label>
                    <textarea
                      id="course-description"
                      placeholder="Descrição"
                      className="w-full p-2 border rounded-md"
                      value={newCourse.description}
                      onChange={(e) =>
                        setNewCourse({
                          ...newCourse,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="course-difficulty"
                      className="block text-sm font-medium mb-1"
                    >
                      Dificuldade
                    </label>
                    <select
                      id="course-difficulty"
                      value={newCourse.difficulty}
                      onChange={(e) =>
                        setNewCourse({
                          ...newCourse,
                          difficulty: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Selecione a Dificuldade</option>
                      <option value="Fácil">Fácil</option>
                      <option value="Intermediário">Intermediário</option>
                      <option value="Difícil">Difícil</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="course-category"
                      className="block text-sm font-medium mb-1"
                    >
                      Categoria
                    </label>
                    <Input
                      id="course-category"
                      placeholder="Categoria"
                      value={newCourse.category}
                      onChange={(e) =>
                        setNewCourse({
                          ...newCourse,
                          category: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="course-image"
                      className="block text-sm font-medium mb-1"
                    >
                      Imagem do Curso
                    </label>
                    <Input
                      type="file"
                      id="course-image"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            setNewCourse({
                              ...newCourse,
                              image: reader.result as string,
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="w-1/2 flex flex-col gap-4">
                  <div className="border p-4 rounded">
                    <h4 className="font-medium mb-2">Adicionar Perguntas</h4>
                    <div>
                      <label
                        htmlFor="question"
                        className="block text-sm font-medium mb-1"
                      >
                        Pergunta
                      </label>
                      <Input
                        id="question"
                        placeholder="Pergunta"
                        value={newQuestion.question}
                        onChange={(e) =>
                          setNewQuestion({
                            ...newQuestion,
                            question: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="correct-answer"
                        className="block text-sm font-medium mb-1"
                      >
                        Resposta Correta
                      </label>
                      <Input
                        id="correct-answer"
                        placeholder="Resposta Correta"
                        value={newQuestion.correctAnswer}
                        onChange={(e) =>
                          setNewQuestion({
                            ...newQuestion,
                            correctAnswer: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="wrong-answer-1"
                        className="block text-sm font-medium mb-1"
                      >
                        Resposta Errada 1
                      </label>
                      <Input
                        id="wrong-answer-1"
                        placeholder="Resposta Errada 1"
                        value={newQuestion.wrongAnswers[0]}
                        onChange={(e) =>
                          setNewQuestion({
                            ...newQuestion,
                            wrongAnswers: [
                              e.target.value,
                              newQuestion.wrongAnswers[1],
                            ],
                          })
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="wrong-answer-2"
                        className="block text-sm font-medium mb-1"
                      >
                        Resposta Errada 2
                      </label>
                      <Input
                        id="wrong-answer-2"
                        placeholder="Resposta Errada 2"
                        value={newQuestion.wrongAnswers[1]}
                        onChange={(e) =>
                          setNewQuestion({
                            ...newQuestion,
                            wrongAnswers: [
                              newQuestion.wrongAnswers[0],
                              e.target.value,
                            ],
                          })
                        }
                      />
                    </div>
                    <Button onClick={handleAddQuestion} className="mt-2">
                      Adicionar Pergunta
                    </Button>
                  </div>
                  {/* <div>
                    <h4 className="font-medium mb-2">Perguntas Adicionadas</h4>
                    {newCourse.questions.map((q, index) => (
                      <div
                        key={index}
                        className="border p-2 rounded mb-2"
                      >
                        <p>
                          <strong>Pergunta:</strong> {q.question}
                        </p>
                        <p>
                          <strong>Correta:</strong> {q.correctAnswer}
                        </p>
                        <p>
                          <strong>Erradas:</strong> {q.wrongAnswers.join(", ")}
                        </p>
                      </div>
                    ))}
                  </div> */}
                </div>
              </div>
              <Button onClick={handleAddCourse} className="mt-4">
                Salvar Curso
              </Button>
            </DialogContent>
          </Dialog>
          {(user.email.includes("@professor") ||
            user.email.includes("@admin")) && (
            <Button onClick={() => router.push("/cursos/gerenciar-cursos")}>
              <Edit2 className="w-4 h-4" />
              Gerenciar Cursos
            </Button>
          )}
        </div>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <Card key={index}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-10 w-1/2" />
                </CardContent>
              </Card>
            ))
          : filteredCourses.map((course) => (
              <Card key={course.id} className="p-4">
                <div className="flex flex-col md:flex-row items-start">
                  {/* Imagem no canto superior esquerdo */}
                  {course.image && (
                    <img
                      src={course.image}
                      alt={`Imagem do curso ${course.name}`}
                      className="h-16 w-16 object-cover rounded-lg md:mr-4 mb-4 md:mb-0"
                    />
                  )}

                  {/* Nome e descrição do curso */}
                  <div className="flex-1">
                    <CardHeader className="p-0">
                      <CardTitle className="text-lg sm:text-xl">
                        {course.name}
                      </CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                  </div>
                </div>

                {/* Conteúdo adicional abaixo */}
                <CardContent className="mt-4">
                  <p>Categoria: {course.category}</p>
                  <p>Dificuldade: {course.difficulty}</p>
                  <Button
                    className="mt-4"
                    onClick={() => router.push(`/cursos/${course.id}`)}
                  >
                    <ArrowBigRight className="w-4 h-4" />
                    Ver Detalhes
                  </Button>
                </CardContent>
              </Card>
            ))}
      </section>
    </div>
  );
}
