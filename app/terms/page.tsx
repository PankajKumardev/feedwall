import {
  FileText,
  Shield,
  AlertCircle,
  RefreshCw,
  Home,
  Lock,
  Mail,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../components/ui/button';

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-6 ">
      <header className="text-center mt-10 pb-10">
        <h1 className="text-3xl  font-bold text-gray-800 dark:text-gray-200">
          <span className="font-bold text-blue-500">
            Feed
            <span className="text-gray-800 dark:text-[#E7E9EC]">-Wall</span>
          </span>{' '}
          Terms of Service
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mt-4">
          Please read these terms carefully before using our service
        </p>
      </header>

      <section className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <FileText className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Acceptance of Terms
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          By accessing or using our service, you agree to comply with and be
          bound by these Terms of Service. If you disagree with any part of the
          terms, you may not access the service.
        </p>
      </section>

      <section className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <Shield className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Use of the Service
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          The service is provided "as is" without warranties of any kind. You
          agree to use the service responsibly and in compliance with applicable
          laws.
        </p>
      </section>

      <section className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <AlertCircle className="w-6 h-6 text-red-500" />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Limitation of Liability
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          We are not liable for any damages resulting from the use or inability
          to use our service.
        </p>
      </section>

      <section className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <Lock className="w-6 h-6 text-purple-500" />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Password Security
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          All user passwords are encrypted and stored securely following
          industry standards.
        </p>
      </section>

      <section className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <Mail className="w-6 h-6 text-teal-500" />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Email Handling
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Email addresses are securely stored for authentication purposes only.
        </p>
      </section>

      <section className="text-center">
        <Link href="/">
          <Button variant="outline">
            <Home className="w-5 h-5 mr-2" />
            Return to Home
          </Button>
        </Link>
      </section>
    </div>
  );
}
