"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "../../../components/ui/card";
import { toast } from "../../../hooks/use-toast";
import { Progress } from "../../../components/ui/progress"; 
import { ArrowLeftCircle } from "lucide-react";

interface Question {
  question: string;
  correctAnswer: string;
  wrongAnswers: string[];
}

interface Course {
  id: number;
  name: string;
  description: string;
  difficulty: string;
  category: string;
  questions: Question[];
  image: string;
}

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [showQuestions, setShowQuestions] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const router = useRouter();

  // Busca o curso pelo ID
  useEffect(() => {
    const fetchCourse = async () => {
      const response = await fetch(`http://localhost:3001/courses/${id}`);
      const data = await response.json();
      setCourse(data);
    };

    if (id) fetchCourse();
  }, [id]);

  // Avança para a próxima pergunta
  const handleNextQuestion = (isCorrect: boolean) => {
    if (isCorrect) setScore(score + 1);

    if (currentQuestion < course!.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      toast({
        title: "Curso finalizado!",
        description: `Sua pontuação foi: ${score + (isCorrect ? 1 : 0)}`,
      });

      setTimeout(() => {
        router.push("/cursos");
      }, 3000);
    }
  };

  if (!course) return <p>Carregando curso...</p>;

  // Calcula o progresso como uma porcentagem
  const progress = ((currentQuestion + 1) / course.questions.length) * 100;

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen p-4 sm:ml-14">
      <Button onClick={handleBack} className="mb-4">
        <ArrowLeftCircle className="mr-2" />
        Voltar
      </Button>

      <Card className="mb-6">
        <CardHeader className="flex">
          
          
          {course.image && (
            <div className="w-32 h-32">
              <img
                src={course.image}
                alt={`Imagem do curso ${course.name}`}
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
          )}
          {/* Conteúdo à esquerda */}
          <div className="flex-1 pr-4">
            <CardTitle className="text-xl">{course.name}</CardTitle>
            <p>{course.description}</p>
          </div>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Dificuldade:</strong> {course.difficulty}
          </p>
          <p>
            <strong>Categoria:</strong> {course.category}
          </p>
          {!showQuestions && (
            <Button className="mt-4" onClick={() => setShowQuestions(true)}>
              Começar Curso
            </Button>
          )}
        </CardContent>
      </Card>

      {showQuestions && (
        <>
          {/* Barra de progresso */}
          <Progress value={progress} className="mb-6" />

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pergunta {currentQuestion + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{course.questions[currentQuestion].question}</p>
              <div className="flex flex-col gap-2 mt-4">
                {/* Mostra respostas em ordem aleatória */}
                {[...course.questions[currentQuestion].wrongAnswers, course.questions[currentQuestion].correctAnswer]
                  .sort(() => Math.random() - 0.5)
                  .map((answer, index) => (
                    <Button
                      key={index}
                      onClick={() =>
                        handleNextQuestion(answer === course.questions[currentQuestion].correctAnswer)
                      }
                    >
                      {answer}
                    </Button>
                  ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
