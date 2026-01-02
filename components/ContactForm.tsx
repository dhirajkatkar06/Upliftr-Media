import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import { useState, useRef } from "react";

interface FormValues {
  name: string;
  email: string;
  service: string;
  message: string;
}

const schema = Yup.object({
  name: Yup.string().min(2, "Name too short").required("Name is required"),
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
        await emailjs.send(
            "service_3j56lfq",
            "template_ka7zeiy",
            {
                name: values.name,
                email: values.email,
                service: values.service,
                message: values.message,
            },
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
              name: "",
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
              <div>
                <Field
                  name="name"
                  placeholder="Full Name"
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:border-cyan-500 outline-none"
                />
                <ErrorMessage name="name" component="div" className="text-red-400 text-xs mt-2" />
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
