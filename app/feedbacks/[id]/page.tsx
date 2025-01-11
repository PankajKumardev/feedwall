'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CSVLink } from 'react-csv';
import { ClipLoader } from 'react-spinners';
import {
  Search,
  Download,
  Star,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import getProjectName from '@/app/actions/getProject';
import getFeedbacks from '@/app/actions/getFeedback';
import { AISummary } from '@/app/actions/Ai';
import { EmbededCode } from '@/components/embedCode';
import { CodeBlock } from '@/components/ui/code-block';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { marked } from 'marked';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { MarqueeSelector } from '@/components/MarqueeFeedback';
import { deleteFeedback } from '@/app/actions/deleteFeedback';

interface Feedback {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  feedback: string;
  rating: number;
  projectid: number;
}

export default function Page() {
  const { id } = useParams();
  const [project, setProject] = useState<string | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[] | null>(null);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<Feedback[] | null>(
    null
  );
  const [summary, setSummary] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'date'>('date');
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [santizedSummary, setSantizedSummary] = useState<string | null>(null);

  const feedbacksPerPage = 4;

  async function getSummary(feedbacks: Feedback[] | null) {
    if (feedbacks) {
      setIsSummaryLoading(true);
      if (feedbacks.length === 0) {
        setSummary('No feedbacks available');
      } else {
        const summary = await AISummary(feedbacks);
        if (summary) {
          setSummary(summary);
          let temp = await marked(summary);
          setSantizedSummary(temp);
        }
      }
      setIsSummaryLoading(false);
    }
  }

  useEffect(() => {
    async function fetchProjectName() {
      if (id) {
        const projectName = await getProjectName(Number(id));
        const Feedbacks = await getFeedbacks(Number(id));

        if (projectName !== undefined) {
          setProject(projectName);
        }
        if (Feedbacks !== undefined) {
          setFeedbacks(Feedbacks);
          setFilteredFeedbacks(Feedbacks);
        }
        setIsLoading(false);
      }
    }
    fetchProjectName();
  }, [id]);

  useEffect(() => {
    if (feedbacks) {
      const filtered = feedbacks.filter(
        (feedback) =>
          feedback.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          feedback.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          feedback.feedback.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const sorted = [...filtered].sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'rating') return b.rating - a.rating;
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
      setFilteredFeedbacks(sorted);
      setCurrentPage(1);
    }
  }, [feedbacks, searchTerm, sortBy]);

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    await deleteFeedback(id);
    setFeedbacks((prev) =>
      prev ? prev.filter((feedback) => feedback.id !== id) : null
    );
    setIsDeleting(false);
  };

  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentFeedbacks = filteredFeedbacks?.slice(
    indexOfFirstFeedback,
    indexOfLastFeedback
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#3B82F6" size={50} />
      </div>
    );
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          <span className="text-blue-500">Feed</span>
          <span className="text-gray-900 dark:text-gray-100">-Wall</span>{' '}
          Feedbacks
        </h1>
        <div className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Review and manage customer feedbacks for {project}
        </div>
      </header>

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Customer Feedbacks</h2>
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          📊 View, search, and manage feedback from your customers. Use the
          tools below to filter and analyze the data.
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
          <div className="flex items-center w-full">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <Input
              type="text"
              placeholder="Search feedbacks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-[95%] "
            />
          </div>
          <div className="flex items-center space-x-4 w-full sm:w-auto justify-end">
            <Select
              value={sortBy}
              onValueChange={(value) =>
                setSortBy(value as 'name' | 'rating' | 'date')
              }
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="rating">Sort by Rating</SelectItem>
                <SelectItem value="date">Sort by Date</SelectItem>
              </SelectContent>
            </Select>
            <CSVLink
              data={filteredFeedbacks || []}
              filename={`${project}_feedbacks.csv`}
              className="flex items-center px-3 py-4 border rounded-md border-neutral-200 bg-white text-sm ring-offset-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus:ring-neutral-300 active:text-red-700 active:bg-red-50 h-9 hover:bg-gray-100 dark:hover:bg-neutral-900 whitespace-nowrap"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </CSVLink>
          </div>
        </div>
        {currentFeedbacks && currentFeedbacks.length > 0 ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Name</TableHead>
                  <TableHead className="w-[200px]">Email</TableHead>
                  <TableHead>Feedback</TableHead>
                  <TableHead className="w-[100px]">Rating</TableHead>
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentFeedbacks.map((feedback) => (
                  <TableRow key={feedback.id}>
                    <TableCell className="font-medium">
                      {feedback.name}
                    </TableCell>
                    <TableCell>{feedback.email}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {feedback.feedback}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 inline-block ${
                            i < feedback.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </TableCell>
                    <TableCell>
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{feedback.name}</DialogTitle>
                            <DialogDescription>
                              <span className="flex items-center space-x-2 my-2 pb-4">
                                <span>{feedback.email}</span>
                                <span className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 inline-block ${
                                        i < feedback.rating
                                          ? 'text-yellow-400 fill-current'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </span>
                              </span>
                              <span className="block w-full h-px bg-gray-200 dark:bg-gray-700 my-2"></span>
                            </DialogDescription>
                          </DialogHeader>
                          <div className="text-sm space-y-2 max-h-40 overflow-y-auto">
                            <div className="text-gray-700 dark:text-gray-300">
                              {feedback.feedback}
                            </div>
                            <div className="text-gray-500 text-xs">
                              Submitted:{' '}
                              {new Date(feedback.createdAt).toLocaleString()}
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Button
                              variant="outline"
                              onClick={() => handleDelete(feedback.id)}
                              disabled={isDeleting}
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              {isDeleting ? (
                                <ClipLoader color="#DC2626" size={16} />
                              ) : (
                                <>
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </>
                              )}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {indexOfFirstFeedback + 1} to{' '}
                {Math.min(indexOfLastFeedback, filteredFeedbacks?.length || 0)}{' '}
                of {filteredFeedbacks?.length} entries
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  size="sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={
                    indexOfLastFeedback >= (filteredFeedbacks?.length || 0)
                  }
                  size="sm"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="text-lg text-gray-600 dark:text-gray-400">
              No feedbacks available 😢
            </div>
          </div>
        )}
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Embed Code</h2>
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          🔗 Use this code to add the feedback widget to your website. Copy and
          paste it into your HTML.
        </div>
        <EmbededCode
          tab1Content={
            <div>
              <CodeBlock
                code={`<body>
<script src="https://cdn.tailwindcss.com"></script>
<script>tailwind.config = {darkMode: 'class'} </script>
<script type="module" src="https://feedback-widget-weld.vercel.app/feedback-widget.js"></script>
<feedback-widget projectId=${id} websiteName=${project}></feedback-widget>
</body>`}
                language="html"
                filename="index.html"
              />
            </div>
          }
          tab2Content={
            <div>
              <CodeBlock
                code={` "use client";
                  
import { useEffect } from 'react';

function FeedBackWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://feedback-widget-weld.vercel.app/feedback-widget.js';
    script.type = 'module';
    document.body.appendChild(script);
  }, []);

  return (
    <>
      {/* @ts-ignore */}
      <feedback-widget projectId=${id} websiteName=${project} />
    </>
  );
}`}
                language="typescript"
                filename="index.tsx"
              />
            </div>
          }
        />
      </div>
      {feedbacks && <MarqueeSelector feedbacks={feedbacks} />}

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Feedback Summary</h2>
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          🤖 Get an AI-generated summary of your customer feedbacks to quickly
          understand trends and insights.
        </div>
        <Button
          onClick={() => getSummary(feedbacks)}
          className="mb-4"
          disabled={isSummaryLoading}
        >
          {isSummaryLoading ? (
            <>
              <ClipLoader color="#FFFFFF" size={16} className="mr-2" />
              Generating Summary...
            </>
          ) : (
            'Get Summary'
          )}
        </Button>
        {summary && (
          <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-md max-h-96 overflow-y-auto">
            {santizedSummary && (
              <div dangerouslySetInnerHTML={{ __html: santizedSummary }} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
