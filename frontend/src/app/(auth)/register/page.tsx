"use client"

import React, { useState } from 'react'

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);


  return (
    <div>Register</div>
  )
}

export default Register