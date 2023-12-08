
export default function formatData (isoDate) {

    const options = { year: 'numeric', month: 'long', day: 'numeric'};

    return new Date(isoDate).toLocaleDateString('bg',options)
}

