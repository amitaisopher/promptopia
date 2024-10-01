'use client'

import {useState, useRef} from 'react'
import PromptCard from '@/components/PromptCard';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


const PromptCardList = ({data, handleTagClick, handleProfileClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleProfileClick={handleProfileClick}/>
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
  const handleTagClick = (tag) => {
    setSearchText(tag)
    setFilteredPosts(posts.current.filter((post) => post.tag === tag))
  }
  const handleProfileClick = (userId) => {
    router.push(`/profile/${userId}`)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
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
        handleTagClick={handleTagClick}
        handleProfileClick={handleProfileClick}
      />
    </section>
  )
}

export default Feed;