import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { useState } from 'react';
const apikey = process.env.REACT_EMAIL_KEY 
const dokey = process.env.REACT_EMAIL_PRIVTE_KEY 
const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [disabled, setDisabled] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    display: false,
    message: '',
    type: '',
  });

  // Shows alert message for form submission feedback
  const toggleAlert = (message, type) => {
    setAlertInfo({ display: true, message, type });

    // Hide alert after 5 seconds
    setTimeout(() => {
      setAlertInfo({ display: false, message: '', type: '' });
    }, 5000);
  };

  // Function called on submit that uses emailjs to send email of valid contact form
  const onSubmit = async (data) => {
    // Destrcture data object
    const { name, email, subject, message } = data;
    try {
      // Disable form while processing submission
      setDisabled(true);

      // Define template params
      const templateParams = {
        name,
        email,
        subject,
        message,
      };

      await emailjs.send( apikey,  'template_p6mcfmd', templateParams, dokey).then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
        },
        (error) => {
          console.log('FAILED...', error);
        },
      );
      // await emailjs.send(
      //   'service_0jywe1g',
      //   'template_9333rd2',
      //   templateParams,
      //   'LzdLSDw5OoLCYiB25'
      // );

      // Display success alert
      toggleAlert('Form submission was successful!', 'success');
    } catch (e) {
      console.error(e);
      // Display error alert
      toggleAlert('Uh oh. Something went wrong.', 'danger');
    } finally {
      // Re-enable form submission
      setDisabled(false);
      // Reset contact form fields after submission
      reset();
    }
  };

  return (
    <div>
       <section className="bg-white">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-bold text-center text-green-900">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-green-500  sm:text-xl">Got a technical issue? Want to send feedback about our feature? Need details about our Business plan? Let us know.</p>
        <form className="space-y-8"   onSubmit={handleSubmit(onSubmit)} noValidate>
           <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-green-500">Name</label>
            <input type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="abc..." required 
              {...register('name', {
              required: {
                value: true,
                message: 'Please enter your name',
              },
              maxLength: {
                value: 30,
                message: 'Please use 30 characters or less',
              },
            })}
            />
                {errors.name && (
                    <span className='errorMessage'>{errors.name.message}</span>
                 )}
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-green-500">Your email</label>
            <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required 
              {...register('email', {
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              })}
            />
            {errors.email && (
              <span className='errorMessage'>
                Please enter a valid email address
              </span>
            )}
          </div>
          <div>
            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-green-500">Subject</label>
            <input type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required 
             name='subject'
             {...register('subject', {
               required: {
                 value: true,
                 message: 'Please enter a subject',
               },
               maxLength: {
                 value: 75,
                 message: 'Subject cannot exceed 75 characters',
               },
             })}
           />
           {errors.subject && (
             <span className='errorMessage'>{errors.subject.message}</span>
           )}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-green-500">Your message</label>
            <textarea id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-white-50 rounded-lg shadow-sm border border-white-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."
               rows={6}
               name='message'
               {...register('message', {
                 required: true,
               })}
             ></textarea>
               {errors.message && (
               <span className='errorMessage'>Please enter a message</span>
             )}
          </div>
          <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-green-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" disabled={disabled}>Send message</button>
        </form>
        {alertInfo.display && (
                <div className={`alert alert-${alertInfo.type} mt-3`} role='alert'>
                  {alertInfo.message}
                </div>
              )}
      </div>
    </section>
   </div>
  );
};

export default Contact;


{/* <div className='container mx-auto flex justify-center items-center h-screen'>
      <div className='row'>
        <div className='col-md-6 text-center'>
          <div className='card'>
            <div className='card-body'>
              <h5 className='card-title text-center mb-4'>Contact Us</h5>
              <form
                id='contact-form'
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <div className='mb-3'>
                  <input
                    type='text'
                    name='name'
                    {...register('name', {
                      required: {
                        value: true,
                        message: 'Please enter your name',
                      },
                      maxLength: {
                        value: 30,
                        message: 'Please use 30 characters or less',
                      },
                    })}
                    className='form-control green-border'
                    placeholder='Name'
                  />
                  {errors.name && (
                    <span className='errorMessage'>{errors.name.message}</span>
                  )}
                </div>
                <div className='mb-3'>
                  <input
                    
                    {...register('email', {
                      required: true,
                      pattern:
                        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    })}
                  />
                  {errors.email && (
                    <span className='errorMessage'>
                      Please enter a valid email address
                    </span>
                  )}
                </div>
                <div className='mb-3'>
                  <input
                    type='text'
                    name='subject'
                    {...register('subject', {
                      required: {
                        value: true,
                        message: 'Please enter a subject',
                      },
                      maxLength: {
                        value: 75,
                        message: 'Subject cannot exceed 75 characters',
                      },
                    })}
                  />
                  {errors.subject && (
                    <span className='errorMessage'>{errors.subject.message}</span>
                  )}
                </div>
                <div className='mb-3'>
                  <textarea
                    rows={3}
                    name='message'
                    {...register('message', {
                      required: true,
                    })}
                  />
                  {errors.message && (
                    <span className='errorMessage'>Please enter a message</span>
                  )}
                </div>
                <button
                  className='btn btn-success btn-block'
                  disabled={disabled}
                  type='submit'
                >
                  Submit
                </button>
              </form>
              {alertInfo.display && (
                <div className={`alert alert-${alertInfo.type} mt-3`} role='alert'>
                  {alertInfo.message}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body'>
              <h5 className='card-title text-center mb-4'>Company Information</h5>
              <p className='info-text'>Email: example@company.com</p>
              <p className='info-text'>Address: 123 Main Street, City, Country</p>
              <p className='info-text'>A small description about the company.</p>
            </div>
          </div>
        </div>
      </div>
    </div> */}