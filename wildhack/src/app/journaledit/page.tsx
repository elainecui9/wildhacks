"use client"
import Header from "../frontpage/header";
import Footer from "../footer";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation'
import Back from "../components/back";
import Link from "next/link";
import Loading from "../components/loadingpage";
import { motion } from "framer-motion";



const complexityOptions = [
  { title: 'Elementary School', description: 'Generate summaries at an elementary level.', current: true },
  { title: 'Middle School', description: 'Generate summaries at a middle school level.', current: false },
  { title: 'High School', description: 'Generate summaries at a high school level.', current: false },
  { title: 'College Level', description: 'Generate summaries at a college level.', current: false },
]
const modeOptions = [
    { title: 'Paragraph', description: 'Generate summaries in paragraph form.', current: true },
    { title: 'Bullet Points', description: 'Generate summaries in bullet points rather than plain text.', current: false },
    { title: 'Discussion Questions', description: 'Generate discussion questions based on the article.', current: false },
  ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function JournalPage() {
  const [selectedcomplexity, setSelectedcomplexity] = useState(complexityOptions[0])
  const [selectedMode, setSelectedMode] = useState(modeOptions[0])
  const router = useRouter();

  const [article, setArticle] = useState();
  const id = useSearchParams().get('id')
  async function search() {
    const res = await fetch(`https://doaj.org/api/search/articles/${id}`);
    const data = await res.json();
    if (data.results?.length > 0) {
        setArticle(data.results[0]);
    }
  }
  useEffect(() => {
    search();
  }, [])
  
  if (!article) {
    return <Loading></Loading>; // or any other loading state
  }
  const authors = article!.bibjson.author.map((author: any)=>(
    "" + author.name+ ", " 
  ))
  const handleClick = async () => {
      
    const queryParameters = {
      name: encodeURIComponent(article!.bibjson.title),
      authors: encodeURIComponent(authors),
        url: encodeURIComponent(article!.bibjson?.link[0]?.url),
        complexity: encodeURIComponent(selectedcomplexity.title),
        mode: encodeURIComponent(selectedMode.title),
      };
    
      const queryString = new URLSearchParams(queryParameters).toString();
    
      router.push(`/journalpage?${queryString}`);
  }
  return (
    
    <section className= "h-full bg-white">
        <div>
            <Header></Header>
        </div>
        <div>
       <section className='flex flex-row items-center justify-between pt-24 '>
    <div className='pl-32 '>
        <Back backpage='/journals'></Back>
        
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
        <h1 className="font-bold text-3xl pb-2">{article!.bibjson.title}</h1>
        <h1 className="italic text-lg pb-8">{authors}</h1>
        <h1>{article.bibjson.abstract}</h1>
        </motion.div>
        
        
    </div>
    <div className='flex flex-col items-center pl-24 pr-32'>
    <h1 className='font-semibold'>Select Complexity:</h1>
    <Listbox value={selectedcomplexity} onChange={setSelectedcomplexity}>
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">Change Complexity status</Listbox.Label>
          <div className="relative">
            <div className="inline-flex divide-x divide-red-900 rounded-md shadow-sm">
              <div className="inline-flex items-center gap-x-1.5 rounded-l-md bg-red-900 px-3 py-2 text-white shadow-sm">
                <CheckIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                <p className="text-sm font-semibold">{selectedcomplexity.title}</p>
              </div>
              <Listbox.Button className="inline-flex items-center rounded-l-none rounded-r-md bg-red-900 p-2 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-offset-2 focus:ring-offset-gray-50">
                <span className="sr-only">Change published status</span>
                <ChevronDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
              </Listbox.Button>
            </div>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {complexityOptions.map((option) => (
                  <Listbox.Option
                    key={option.title}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-red-900 text-white' : 'text-gray-900',
                        'cursor-default select-none p-4 text-sm'
                      )
                    }
                    value={option}
                  >
                    {({ selectedcomplexity, active }) => (
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <p className={selectedcomplexity ? 'font-semibold' : 'font-normal'}>{option.title}</p>
                          {selectedcomplexity ? (
                            <span className={active ? 'text-white' : 'text-red-900'}>
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </div>
                        <p className={classNames(active ? 'text-white' : 'text-gray-500', 'mt-2')}>
                          {option.description}
                        </p>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
    <h1 className='font-semibold pt-4'>Select Mode of Text:</h1>
    <Listbox value={selectedMode} onChange={setSelectedMode}>
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">Change Mode status</Listbox.Label>
          <div className="relative">
            <div className="inline-flex divide-x divide-red-900 rounded-md shadow-sm">
              <div className="inline-flex items-center gap-x-1.5 rounded-l-md bg-red-900 px-3 py-2 text-white shadow-sm">
                <CheckIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                <p className="text-sm font-semibold">{selectedMode.title}</p>
              </div>
              <Listbox.Button className="inline-flex items-center rounded-l-none rounded-r-md bg-red-900 p-2 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-offset-2 focus:ring-offset-gray-50">
                <span className="sr-only">Change published status</span>
                <ChevronDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
              </Listbox.Button>
            </div>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {modeOptions.map((option) => (
                  <Listbox.Option
                    key={option.title}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-red-900 text-white' : 'text-gray-900',
                        'cursor-default select-none p-4 text-sm'
                      )
                    }
                    value={option}
                  >
                    {({ selectedMode, active }) => (
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <p className={selectedMode ? 'font-semibold' : 'font-normal'}>{option.title}</p>
                          {selectedMode ? (
                            <span className={active ? 'text-white' : 'text-red-900'}>
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </div>
                        <p className={classNames(active ? 'text-white' : 'text-gray-500', 'mt-2')}>
                          {option.description}
                        </p>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
    <button onClick = {handleClick} className='mt-16 text-bold bg-red-900 text-white px-8 py-2 rounded-lg'>
      Generate Text
    </button>
    </div>

    
    </section>
        </div>
        <Footer></Footer>
    </section>
  )
}
