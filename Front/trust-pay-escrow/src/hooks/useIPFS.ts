'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export function useIPFS() {
  const [isUploading, setIsUploading] = useState(false);
  const [cid, setCid] = useState<string | null>(null);

  async function uploadText(text: string): Promise<string | null> {
    if (!process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN) {
      // Demo mode: return a fake CID
      const fakeCid = 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi';
      setCid(fakeCid);
      return fakeCid;
    }
    setIsUploading(true);
    try {
      // Using a simple fetch to web3.storage or nft.storage API
      const response = await fetch('https://api.web3.storage/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN}`,
          'Content-Type': 'text/plain',
        },
        body: text,
      });
      if (!response.ok) throw new Error('Upload failed');
      const data = await response.json();
      setCid(data.cid);
      return data.cid;
    } catch (err: unknown) {
      toast.error('IPFS upload failed: ' + (err instanceof Error ? err.message : 'Unknown error'));
      return null;
    } finally {
      setIsUploading(false);
    }
  }

  async function uploadFile(file: File): Promise<string | null> {
    if (!process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN) {
      const fakeCid = 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi';
      setCid(fakeCid);
      return fakeCid;
    }
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('https://api.web3.storage/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN}`,
        },
        body: formData,
      });
      if (!response.ok) throw new Error('Upload failed');
      const data = await response.json();
      setCid(data.cid);
      return data.cid;
    } catch (err: unknown) {
      toast.error('IPFS upload failed: ' + (err instanceof Error ? err.message : 'Unknown error'));
      return null;
    } finally {
      setIsUploading(false);
    }
  }

  function getIPFSUrl(cid: string): string {
    return `https://ipfs.io/ipfs/${cid}`;
  }

  return { uploadText, uploadFile, getIPFSUrl, isUploading, cid };
}
