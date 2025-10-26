// Helper function to convert image file or URL to base64
export const toBase64 = (input) => {
  return new Promise((resolve, reject) => {
    if (input instanceof File) {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(input);
    } else if (typeof input === 'string') {
      fetch(input)
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(new Error('Failed to read image URL'));
          reader.readAsDataURL(blob);
        })
        .catch((err) => reject(err));
    } else {
      reject(new Error('Invalid input: must be File or URL'));
    }
  });
};

export const initiateFashnJob = async (params) => {
  const apiKey = process.env.NEXT_PUBLIC_FASHN_API_KEY;

  if (!apiKey) {
    console.error('FASHN_API_KEY is not set.');
    return {
      success: false,
      error: 'API key is not configured.',
    };
  }

  if (!params.modelImageBase64 || !params.garmentBase64) {
    return { success: false, error: 'Missing model or garment image data.' };
  }

  try {
    const apiRequestBody = {
      model_image: params.modelImageBase64,
      garment_image: params.garmentBase64,
      category: params.category,
      segmentation_free: params.segmentation_free,
      mode: params.mode,
      num_samples: params.num_samples,
      return_base64: true,
    };

    const runResponse = await fetch('https://api.fashn.ai/v1/run', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestBody),
    });

    if (!runResponse.ok) {
      const errorBody = await runResponse.text();
      console.error('Fashn.ai API Error on /v1/run:', errorBody, 'Status:', runResponse.status);
      return {
        success: false,
        error: `API request failed with status ${runResponse.status}. Details: ${errorBody}`,
      };
    }

    const responseData = await runResponse.json();
    const { id, error } = responseData;

    if (error || !id) {
      console.error('Fashn.ai API Error in response data:', error);
      return {
        success: false,
        error: error || 'Failed to submit job to Fashn.ai API (no ID or error in response).',
      };
    }

    return { success: true, jobId: id };
  } catch (err) {
    console.error('Error initiating Fashn.ai job:', err);
    return {
      success: false,
      error: err.message || 'Unexpected error during job initiation.',
    };
  }
};

export const getFashnJobStatus = async (jobId) => {
  const apiKey = process.env.NEXT_PUBLIC_FASHN_API_KEY;

  if (!apiKey) {
    console.error('FASHN_API_KEY is not set.');
    return {
      success: false,
      error: 'API key is not configured.',
    };
  }

  try {
    const statusResponse = await fetch(`https://api.fashn.ai/v1/status/${jobId}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (!statusResponse.ok) {
      const errorBody = await statusResponse.text();
      console.error('Fashn.ai Status API Error:', errorBody, 'Status:', statusResponse.status);
      return {
        success: false,
        error: `Status check failed with status ${statusResponse.status}. Details: ${errorBody}`,
      };
    }

    const statusData = await statusResponse.json();

    if (statusData.status === 'completed') {
      const outputImage = statusData.output?.[0];
      if (!outputImage) {
        console.error('Job completed but no output image found for job ID:', jobId, statusData);
        return {
          success: true,
          status: 'failed',
          error: 'Job completed but no output image was found.',
        };
      }
      return { success: true, status: 'completed', imageUrl: outputImage };
    }

    if (statusData.status === 'failed') {
      console.error('Fashn.ai job failed:', statusData.error, 'Job ID:', jobId);
      return {
        success: true,
        status: 'failed',
        error: statusData.error || 'Fashn.ai generation failed.',
      };
    }

    return { success: true, status: 'processing' };
  } catch (err) {
    console.error(`Error checking status for job ${jobId}:`, err);
    return {
      success: false,
      error: err.message || 'Unexpected error during status check.',
    };
  }
};