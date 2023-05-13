import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function ProductDetail() {
    const router = useRouter();

    useEffect(() => {
        console.log('««««« router »»»»»', router);
    }, []);

  return (
    <div>ProductDetail</div>
  )
}
