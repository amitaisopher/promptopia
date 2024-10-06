'use client'

import {useState, useRef} from 'react'
import PromptCard from '@/components/PromptCard';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}/>
      ))}
    </div>)
}
const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [filteredPosts, setFilteredPosts] = useState([])
  const router = useRouter()
  const posts = useRef([])
  const handleSearchChange = (e) => {
    e.preventDefault()
    setSearchText(e.target.value)
    setFilteredPosts(
      posts.current.filter((post) => {
        return (post.tag.includes(e.target.value) || post.prompt.includes(e.target.value) || e.target.value === '')
      })
    )
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt', { cache: 'no-store' })
      const data = await response.json()
      posts.current = data
      setFilteredPosts(data)
    }
    fetchPosts()
  
  }, [])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
        type="text" 
        placeholder="Search for a tag or a username"
        value={searchText}
        onChange={handleSearchChange}
        required
        className="search_input peer"/>
      </form>

      <PromptCardList
        data={filteredPosts}
        handleTagClick={() => {
          router.push(`/api/tag/${tag}`)
        }}
      />
    </section>
  )
}

export default Feed;