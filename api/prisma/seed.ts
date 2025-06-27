// This file is used to seed the database with initial data.
// https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding

import { PrismaClient, ProjectType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Demo posts
  await prisma.post.upsert({
    where: { title: "Check out Prisma with Next.js" },
    update: {},
    create: {
      title: "Check out Prisma with Next.js",
      content: "https://www.prisma.io/nextjs",
    },
  });
  await prisma.post.upsert({
    where: { title: "Follow Prisma on Twitter" },
    update: {},
    create: {
      title: "Follow Prisma on Twitter",
      content: "https://twitter.com/prisma",
    },
  });
  await prisma.post.upsert({
    where: { title: "Follow Nexus on Twitter" },
    update: {},
    create: {
      title: "Follow Nexus on Twitter",
      content: "https://twitter.com/nexusgql",
    },
  });

  // LLMs projects and evaluations
  await prisma.project.upsert({
    where: { name: "customer help" },
    update: {},
    create: { name: "customer help", type: ProjectType.Chatbot, conformityProgress: 0.9 },
  });
  await prisma.project.upsert({
    where: { name: "TOS extractor" },
    update: {},
    create: { name: "TOS extractor", type: ProjectType.RAG, conformityProgress: 0.7 },
  });
  await prisma.project.upsert({
    where: { name: "pdf2json" },
    update: {},
    create: { name: "pdf2json", type: ProjectType.Converter, conformityProgress: 0.2 },
  });

  // Systems
  await prisma.system.upsert({ where: { name: "Mixtral-8x7B-finetuned" }, update: {}, create: { name: "Mixtral-8x7B-finetuned" } });
  await prisma.system.upsert({ where: { name: "Mixtral-8x7B-prompt01" }, update: {}, create: { name: "Mixtral-8x7B-prompt01" } });
  await prisma.system.upsert({ where: { name: "Mixtral-8x7B-prompt02" }, update: {}, create: { name: "Mixtral-8x7B-prompt02" } });
  await prisma.system.upsert({ where: { name: "Llama3_RAG_ch200_th07" }, update: {}, create: { name: "Llama3_RAG_ch200_th07" } });
  await prisma.system.upsert({ where: { name: "Llama3_RAG_ch250_th07" }, update: {}, create: { name: "Llama3_RAG_ch250_th07" } });
  await prisma.system.upsert({ where: { name: "Mixtral_RAG_ch200_th08" }, update: {}, create: { name: "Mixtral_RAG_ch200_th08" } });
  await prisma.system.upsert({ where: { name: "Mixtral_RAG_ch200_th07" }, update: {}, create: { name: "Mixtral_RAG_ch200_th07" } });
  await prisma.system.upsert({ where: { name: "GPT4o-base" }, update: {}, create: { name: "GPT4o-base" } });
  await prisma.system.upsert({ where: { name: "llama-11b-vision-instruct-base" }, update: {}, create: { name: "llama-11b-vision-instruct-base" } });

  // Datasets
  await prisma.dataset.upsert({ where: { name: "QandA01" }, update: {}, create: { name: "QandA01" } });
  await prisma.dataset.upsert({ where: { name: "QandA02" }, update: {}, create: { name: "QandA02" } });
  await prisma.dataset.upsert({ where: { name: "TOS01" }, update: {}, create: { name: "TOS01" } });
  await prisma.dataset.upsert({ where: { name: "CustomerPetition01" }, update: {}, create: { name: "CustomerPetition01" } });

  // Evaluations
  await prisma.evaluation.deleteMany({}); // Clean slate for evaluations

  const projects = await prisma.project.findMany({ select: { id: true, name: true } });
  const systems = await prisma.system.findMany({ select: { id: true, name: true } });
  const datasets = await prisma.dataset.findMany({ select: { id: true, name: true } });

  const getProjectId = (name: string) => projects.find((p) => p.name === name)!.id;
  const getSystemId = (name: string) => systems.find((s) => s.name === name)!.id;
  const getDatasetId = (name: string) => datasets.find((d) => d.name === name)!.id;

  await prisma.evaluation.createMany({
    data: [
      { projectId: getProjectId("customer help"), systemId: getSystemId("Mixtral-8x7B-finetuned"), datasetId: getDatasetId("QandA01"), accuracy: 0.9, relevancy: 0.8, helpfulness: 0.7, toxicity: 0.1, score: 0.8 },
      { projectId: getProjectId("customer help"), systemId: getSystemId("Mixtral-8x7B-prompt01"), datasetId: getDatasetId("QandA01"), accuracy: 0.8, relevancy: 0.7, helpfulness: 0.6, toxicity: 0.2, score: 0.7 },
      { projectId: getProjectId("customer help"), systemId: getSystemId("Mixtral-8x7B-prompt02"), datasetId: getDatasetId("QandA01"), accuracy: 0.9, relevancy: 0.7, helpfulness: 0.9, toxicity: 0.1, score: 0.8 },
      { projectId: getProjectId("customer help"), systemId: getSystemId("Mixtral-8x7B-prompt02"), datasetId: getDatasetId("QandA02"), accuracy: 0.9, relevancy: 0.8, helpfulness: 0.6, toxicity: 0.2, score: 0.8 },
      { projectId: getProjectId("TOS extractor"), systemId: getSystemId("Llama3_RAG_ch200_th07"), datasetId: getDatasetId("TOS01"), accuracy: 0.9, relevancy: 0.8, helpfulness: 0.7, toxicity: 0.1, score: 0.8 },
      { projectId: getProjectId("TOS extractor"), systemId: getSystemId("Llama3_RAG_ch250_th07"), datasetId: getDatasetId("TOS01"), accuracy: 0.8, relevancy: 0.7, helpfulness: 0.6, toxicity: 0.2, score: 0.7 },
      { projectId: getProjectId("TOS extractor"), systemId: getSystemId("Mixtral_RAG_ch200_th08"), datasetId: getDatasetId("TOS01"), accuracy: 0.9, relevancy: 0.7, helpfulness: 0.9, toxicity: 0.1, score: 0.8 },
      { projectId: getProjectId("TOS extractor"), systemId: getSystemId("Mixtral_RAG_ch200_th07"), datasetId: getDatasetId("TOS01"), accuracy: 0.9, relevancy: 0.8, helpfulness: 0.6, toxicity: 0.2, score: 0.8 },
      { projectId: getProjectId("pdf2json"), systemId: getSystemId("GPT4o-base"), datasetId: getDatasetId("CustomerPetition01"), accuracy: 0.9, relevancy: 0.8, helpfulness: 0.7, toxicity: 0.1, score: 0.8 },
      { projectId: getProjectId("pdf2json"), systemId: getSystemId("llama-11b-vision-instruct-base"), datasetId: getDatasetId("CustomerPetition01"), accuracy: 0.8, relevancy: 0.7, helpfulness: 0.6, toxicity: 0.2, score: 0.7 },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error seeding data:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
