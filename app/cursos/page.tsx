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
import { ArrowBigRight, Edit2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface Course {
  id?: number; // Continua opcional
  name: string;
  description: string;
  difficulty: string;
  category: string;
  questions: {
    question: string;
    correctAnswer: string;
    wrongAnswers: string[];
  }[]; 
}

export default function Cursos() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para a pesquisa
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]); // Estado para os cursos filtrados

  const [newCourse, setNewCourse] = useState<Course>({
    name: "",
    description: "",
    difficulty: "",
    category: "",
    questions: [],
  });

  const [newQuestion, setNewQuestion] = useState({
    question: "",
    correctAnswer: "",
    wrongAnswers: ["", ""],
  });

  // Fetch cursos do JSON Server
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("http://localhost:3001/courses");
      const data = await response.json();
      setCourses(data);
      setFilteredCourses(data); // Inicializa com todos os cursos
    };
    fetchCourses();
  }, []);

  // Função de filtro para buscar cursos pelo nome
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      setFilteredCourses(courses); // Se não houver pesquisa, mostra todos os cursos
    } else {
      setFilteredCourses(
        courses.filter((course) =>
          course.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  // Adiciona um novo curso ao JSON Server
  const handleAddCourse = async () => {
    const response = await fetch("http://localhost:3001/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCourse),
    });

    if (response.ok) {
      const createdCourse = await response.json();
      setCourses([...courses, createdCourse]); // O JSON Server retorna o curso criado com o ID atribuído
      setNewCourse({
        name: "",
        description: "",
        difficulty: "",
        category: "",
        questions: [],
      });
      setFilteredCourses([...courses, createdCourse]); // Atualiza os cursos filtrados
    }
  };

  // Adiciona uma nova pergunta ao curso
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

  const router = useRouter(); // Inicialize o hook

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:ml-14">
      <div className="flex justify-between items-center mb-6">
        <Input
          placeholder="Buscar curso..."
          className="w-full sm:w-80"
          value={searchQuery}
          onChange={handleSearch} // Conectando a função de pesquisa
        />
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button><PlusCircle className="w-4 h-4" />
              Adicionar Curso</Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl">
              {" "}
              {/* Modal mais largo */}
              <DialogHeader>
                <DialogTitle>Adicionar Novo Curso</DialogTitle>
              </DialogHeader>
              <div className="flex gap-8">
                {/* Container da esquerda */}
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
                      className="w-full p-2 border border-gray-300 rounded-md"
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
                      className="w-full p-2 border border-gray-300 rounded-md"
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
                </div>

                {/* Container da direita */}
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
                  <div>
                    <h4 className="font-medium mb-2">Perguntas Adicionadas</h4>
                    {newCourse.questions.map((q, index) => (
                      <div
                        key={index}
                        className="border p-2 rounded mb-2 bg-gray-50"
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
                  </div>
                </div>
              </div>
              <Button onClick={handleAddCourse} className="mt-4">
                Salvar Curso
              </Button>
            </DialogContent>
          </Dialog>
          <Button onClick={() => router.push("/cursos/gerenciar-cursos")}>
          <Edit2 className="w-4 h-4" />
            Gerenciar Cursos
          </Button>
        </div>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredCourses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl text-gray-600">
                {course.name}
              </CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Categoria: {course.category}</p>
              <p>Dificuldade: {course.difficulty}</p>
              <Button onClick={() => router.push(`/cursos/${course.id}`)}>
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
