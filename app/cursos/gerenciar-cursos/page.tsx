"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { Modal } from "../../../components/ui/modal";
import { Trash, Edit, ArrowLeft, Download } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { toast } from "../../../hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";

interface Course {
  id: number;
  name: string;
  description: string;
  difficulty: string;
  category: string;
  questions: { question: string; answer: string }[];
}

export default function GerenciarCursos() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter(); // Adicionando o hook do router

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("http://localhost:3001/courses");
      const data = await response.json();
      setCourses(data);
    };
    fetchCourses();
  }, []);

  // Função para voltar à página anterior
  const handleBack = () => {
    router.back(); // Voltar para a página anterior
  };

  const handleDelete = async (id: number) => {
    const response = await fetch(`http://localhost:3001/courses/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setCourses(courses.filter((course) => course.id !== id));
      toast({
        title: "Curso excluido com Sucesso",
      });
    }
  };

  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (selectedCourse) {
      const response = await fetch(
        `http://localhost:3001/courses/${selectedCourse.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedCourse),
        }
      );

      if (response.ok) {
        setIsModalOpen(false);
        const updatedCourses = courses.map((course) =>
          course.id === selectedCourse.id ? selectedCourse : course
        );
        setCourses(updatedCourses);
        toast({
          title: "Curso Editado com Sucesso.",
        });
      }
    }
  };

  const handleDownloadPDF = (course: Course) => {
    const doc = new jsPDF();

    // Adiciona o título
    doc.setFontSize(18);
    doc.text("Relatório do Curso", 14, 10);

    // Adiciona os dados principais do curso
    doc.setFontSize(12);
    doc.text(`Nome: ${course.name}`, 14, 20);
    doc.text(`Descrição: ${course.description}`, 14, 30);
    doc.text(`Dificuldade: ${course.difficulty}`, 14, 40);
    doc.text(`Categoria: ${course.category}`, 14, 50);

    // Adiciona as perguntas e respostas
    doc.text("Perguntas:", 14, 60);
    const questions = course.questions.map((qna, index) => [
      `Pergunta ${index + 1}: ${qna.question}`,
    ]);

    // Adiciona tabela das perguntas e respostas
    doc.autoTable({
      head: [["Perguntas"]],
      body: questions.map(([question, answer]) => [question, answer]),
      startY: 70,
      theme: "grid",
    });

    // Gera o PDF e permite o download
    doc.save(`${course.name}-relatorio.pdf`);
  };

  const handleDeleteQuestion = (index: number) => {
    if (selectedCourse) {
      const updatedQuestions = selectedCourse.questions.filter(
        (_, i) => i !== index
      );
      setSelectedCourse({
        ...selectedCourse,
        questions: updatedQuestions,
      });
    }
  };

  return (
    <div className="min-h-screen p-4 sm:ml-14">
      <Button onClick={handleBack} className="mb-4">
        <ArrowLeft className="mr-2" />
        Voltar
      </Button>
      <h2 className="text-2xl mb-4">Gerenciar Cursos</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell className="px-4 py-2">Nome</TableCell>
            <TableCell className="px-4 py-2">Descrição</TableCell>
            <TableCell className="px-4 py-2">Dificuldade</TableCell>
            <TableCell className="px-4 py-2">Categoria</TableCell>
            <TableCell className="px-4 py-2">Ações</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell className="px-4 py-2">{course.name}</TableCell>
              <TableCell className="px-4 py-2">{course.description}</TableCell>
              <TableCell className="px-4 py-2">{course.difficulty}</TableCell>
              <TableCell className="px-4 py-2">{course.category}</TableCell>
              <TableCell className="px-4 py-2">
                <Button
                  onClick={() => handleEdit(course)}
                  variant="outline"
                  size="icon"
                  className="mr-2"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => handleDelete(course.id)}
                  variant="outline"
                  size="icon"
                  color="destructive"
                >
                  <Trash className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => handleDownloadPDF(course)}
                  variant="outline"
                  size="icon"
                  color="secondary"
                  className="ml-2"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal para Edição */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl w-full">
          {" "}
          {/* Aumentando a largura */}
          <DialogHeader>
            <DialogTitle>Editar Curso</DialogTitle>
          </DialogHeader>
          {selectedCourse && (
            <div className="flex flex-col md:flex-row gap-4">
              {/* Coluna 1 - Informações do Curso */}
              <div className="flex-1 space-y-4 border-r pr-4">
                <div>
                  <label
                    htmlFor="course-name"
                    className="block text-sm font-medium"
                  >
                    Nome do Curso
                  </label>
                  <Input
                    id="course-name"
                    placeholder="Nome do Curso"
                    value={selectedCourse.name}
                    onChange={(e) =>
                      setSelectedCourse({
                        ...selectedCourse,
                        name: e.target.value,
                      })
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="course-description"
                    className="block text-sm font-medium"
                  >
                    Descrição
                  </label>
                  <textarea
                    id="course-description"
                    placeholder="Descrição"
                    className="w-full p-2 border rounded-md"
                    value={selectedCourse.description}
                    onChange={(e) =>
                      setSelectedCourse({
                        ...selectedCourse,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="course-difficulty"
                    className="block text-sm font-medium"
                  >
                    Dificuldade
                  </label>
                  <select
                    id="course-difficulty"
                    value={selectedCourse.difficulty}
                    onChange={(e) =>
                      setSelectedCourse({
                        ...selectedCourse,
                        difficulty: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="" disabled>
                      Selecione a dificuldade
                    </option>
                    <option value="Fácil">Fácil</option>
                    <option value="Intermediário">Intermediário</option>
                    <option value="Difícil">Difícil</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="course-category"
                    className="block text-sm font-medium"
                  >
                    Categoria
                  </label>
                  <Input
                    id="course-category"
                    placeholder="Categoria"
                    value={selectedCourse.category}
                    onChange={(e) =>
                      setSelectedCourse({
                        ...selectedCourse,
                        category: e.target.value,
                      })
                    }
                    className="w-full"
                  />
                </div>
              </div>

              {/* Coluna 2 - Perguntas */}
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-4">Perguntas</h3>
                {/* Adicionando limite de altura e overflow-scroll */}
                <div className="grid grid-cols-1 gap-4 max-h-64 overflow-y-auto border rounded-md p-2">
                  {selectedCourse.questions.map((qna, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-md shadow-sm"
                    >
                      <div>
                        <strong>Pergunta {index + 1}: </strong>
                        <span>{qna.question}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="p-4"
                        onClick={() => handleDeleteQuestion(index)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
