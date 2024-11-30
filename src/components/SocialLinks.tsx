import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { TwitterLogoIcon } from '@radix-ui/react-icons'

const SocialLinks = () => {
  return (
    <div className="flex items-center gap-4 backdrop-blur-sm">
      <a
        href="https://github.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/80 hover:text-white transition-colors"
        aria-label="Visit GitHub profile"
        tabIndex={0}
      >
        <GitHubLogoIcon className="h-6 w-6 md:h-8 md:w-8" />
      </a>
      <a
        href="https://twitter.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/80 hover:text-white transition-colors"
        aria-label="Visit X (Twitter) profile"
        tabIndex={0}
      >
        <TwitterLogoIcon className="h-6 w-6 md:h-8 md:w-8" />
      </a>
    </div>
  )
}

export default SocialLinks
