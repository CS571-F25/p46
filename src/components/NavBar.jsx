import { useEffect, useState } from 'react'

function getActiveFromHash() {
    const hash = (typeof window !== 'undefined' && window.location.hash) || ''
    const path = hash.replace(/^#\/?/, '')
    if (path === '' || path === '/') return 'home'
    if (path.startsWith('generate')) return 'generate'
    if (path.startsWith('pre-generated')) return 'pre-generated'
    if (path.startsWith('custom')) return 'custom'
    return 'home'
}

export default function NavBar() {
    const [active, setActive] = useState(getActiveFromHash)

    useEffect(() => {
        function onHashChange() {
            setActive(getActiveFromHash())
        }
        window.addEventListener('hashchange', onHashChange)
        // also handle initial mount
        onHashChange()
        return () => window.removeEventListener('hashchange', onHashChange)
    }, [])

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand d-flex align-items-center" href="#/">
                    <span className="me-2">Quizzer</span>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className={"nav-link" + (active === 'home' ? ' active' : '')} href="#/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className={"nav-link" + (active === 'generate' ? ' active' : '')} href="#/generate">Generate Quiz</a>
                        </li>
                        <li className="nav-item">
                            <a className={"nav-link" + (active === 'pre-generated' ? ' active' : '')} href="#/pre-generated">Pre-generated Quizzes</a>
                        </li>
                        <li className="nav-item">
                            <a className={"nav-link" + (active === 'custom' ? ' active' : '')} href="#/custom">Your Quizzes</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
