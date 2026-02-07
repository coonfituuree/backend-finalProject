"use client";

import Accordion from "@/shared/ui/Accordion";
import Container from "@/shared/ui/Container";
import Link from "next/link";
import { useState } from "react";

function FAQ() {
  const [currentStatus, setCurrentStatus] = useState(1);

  const faqs = [
    {
      id: 1,
      question: "How do I book a flight?",
      answer: (
        <>
          <p>To book a flight, follow these steps:</p>
          <ul className="mt-2 list-disc list-inside space-y-2">
            <li>Use the search field on the homepage</li>
            <li>Select a flight from the available options</li>
            <li>Click the "Book" button</li>
            <li>Fill in passenger information</li>
            <li>Confirm and proceed to payment</li>
            <li>Enter your card details</li>
          </ul>
        </>
      ),
    },
    {
      id: 2,
      question: "How can I cancel or change a booking?",
      answer: (
        <>
          <p>
            You can manage your bookings in the{" "}
            <Link href="/bookings" className="text-blue-600 font-bold">
              "My Bookings"
            </Link>{" "}
            section:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-2">
            <li>View all your active bookings</li>
            <li>To cancel a booking, click the "Cancel booking" button</li>
            <li>Refunds will be issued to the same card</li>
            <li>
              Changing a route requires canceling and making a new booking
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 3,
      question: "What payment methods do you accept?",
      answer: (
        <>
          <p>We accept credit and debit card payments:</p>
          <ul className="mt-2 list-disc list-inside space-y-2">
            <li>Visa</li>
            <li>Mastercard</li>
            <li>Mir</li>
          </ul>
          <p className="mt-4">
            All payments are processed securely. Your card details are not
            stored on our servers.
          </p>
        </>
      ),
    },
    {
      id: 4,
      question: "How will I receive booking confirmation?",
      answer: (
        <>
          <p>After successful payment you will receive:</p>
          <ul className="mt-2 list-disc list-inside space-y-2">
            <li>A PNR number (unique booking identifier)</li>
            <li>Confirmation with status "Confirmed"</li>
            <li>Flight and passenger information</li>
            <li>Ability to view the ticket in your profile</li>
          </ul>
        </>
      ),
    },
    {
      id: 5,
      question: "What is your refund policy?",
      answer: (
        <>
          <p>We offer full refunds for cancellations:</p>
          <ul className="mt-2 list-disc list-inside space-y-2">
            <li>Refund to the same payment card within 3-5 business days</li>
            <li>Cancellations can be made before departure</li>
            <li>No cancellation fee is charged</li>
            <li>No refunds after the flight has departed</li>
          </ul>
        </>
      ),
    },
    {
      id: 6,
      question: "How do I update my profile?",
      answer: (
        <>
          <p>To update your profile details:</p>
          <ul className="mt-2 list-disc list-inside space-y-2">
            <li>
              Go to the{" "}
              <Link href="/profile" className="text-blue-600 font-bold">
                "Profile"
              </Link>
            </li>
            <li>Click the "Edit profile" button</li>
            <li>Update the necessary details (first name, last name, phone)</li>
            <li>Click "Save changes"</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen mt-16 w-full bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <Container className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-lg">
            Answers to common questions about booking and travel
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <Accordion
              key={faq.id}
              label={faq.question}
              className={`bg-white rounded-lg transition ${
                currentStatus === faq.id ? "shadow-lg" : "shadow-none"
              }`}
              content={faq.answer}
              status={currentStatus === faq.id}
              setStatus={() => setCurrentStatus(faq.id)}
            />
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Didn't find the answer?
          </h2>
          <p className="text-gray-600 mb-6">
            If you still have questions, contact our support:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-semibold text-gray-800 mb-2">📧 Email:</p>
              <p className="text-gray-600">support@vizierairways.com</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-2">☎️ Phone:</p>
              <p className="text-gray-600">+7 (800) 555-35-35</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default FAQ;
