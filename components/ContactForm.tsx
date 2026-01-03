import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import { useState, useRef } from "react";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  service: string;
  message: string;
}

const schema = Yup.object({
  firstName: Yup.string().min(2, "First name too short").required("First name is required"),
  lastName: Yup.string().min(2, "Last name too short").required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  service: Yup.string().required("Please select a service"),
  message: Yup.string().min(10, "Message too short").required("Message is required"),
});

const ContactForm = () => {
  const [sent, setSent] = useState(false);
  const submitLock = useRef(false);

  const onSubmit = async (values: FormValues, { resetForm }: any) => {
    if (submitLock.current) return;
    submitLock.current = true;

    try {
      const templateParams = {
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        service: values.service,
        message: values.message,
      };

      // 1️⃣ ADMIN EMAIL (YOU receive this)
      await emailjs.send(
        "service_3j56lfq",
        "template_ka7zeiy",
        templateParams,
        "GMKElwlFnzP2YGuej"
      );

      // 2️⃣ USER CONFIRMATION EMAIL (CLIENT receives this)
      await emailjs.send(
        "service_3j56lfq",
        "template_me80jv5",
        templateParams,
        "GMKElwlFnzP2YGuej"
      );

      setSent(true);
      resetForm();

      setTimeout(() => setSent(false), 5000);

    } catch (err) {
      alert("Something went wrong. Please try again.");
    
    } finally {
      submitLock.current = false;
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        service: "Performance Marketing",
        message: "",
      }}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          {!sent ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Field
                    name="firstName"
                    placeholder="First Name"
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 text-white"
                  />
                  <ErrorMessage name="firstName" component="div" className="text-red-400 text-xs mt-2" />
                </div>

                <div>
                  <Field
                    name="lastName"
                    placeholder="Last Name"
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 text-white"
                  />
                  <ErrorMessage name="lastName" component="div" className="text-red-400 text-xs mt-2" />
                </div>
              </div>

              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:border-cyan-500 outline-none"
                />
                <ErrorMessage name="email" component="div" className="text-red-400 text-xs mt-2" />
              </div>

                          <div>
                              <Field
                                  as="select"
                                  name="service"
                                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:border-cyan-500 outline-none appearance-none cursor-pointer"
                              >
                                  <option value="Performance Marketing">Performance Marketing</option>
                                  <option value="Social Media Management">Social Media Management</option>
                                  <option value="Production Management">Production Management</option>
                                  <option value="Influencer Marketing">Influencer Marketing</option>
                                  <option value="Web Development">Web Development</option>
                              </Field>

                              <ErrorMessage
                                  name="service"
                                  component="div"
                                  className="text-red-400 text-xs mt-2"
                              />
                          </div>

              <div>
                <Field
                  as="textarea"
                  rows={4}
                  name="message"
                  placeholder="Tell us about your project"
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:border-cyan-500 outline-none"
                />
                <ErrorMessage name="message" component="div" className="text-red-400 text-xs mt-2" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cyan-600 hover:bg-cyan-500 py-5 rounded-2xl font-bold text-lg text-white transition-all"
              >
                {isSubmitting ? "Sending..." : "SEND ENQUIRY"}
              </button>
            </>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-3xl font-heading font-bold text-white mb-4">
                Thank you!
              </h3>
              <p className="text-slate-400">
                Your message has been sent successfully.  
                We’ll contact you shortly.
              </p>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
