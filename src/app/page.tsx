import { getConfig } from '@/lib/config';
import { getMarkdownContent, getBibtexContent, getTomlContent, getPageConfig } from '@/lib/content';
import { parseBibTeX } from '@/lib/bibtexParser';
import Profile from '@/components/home/Profile';
import About from '@/components/home/About';
import Publications from '@/components/home/Publications';
import News, { NewsItem } from '@/components/home/News';
import Education, { EducationItem } from '@/components/home/Education';
import Experience, { ExperienceItem } from '@/components/home/Experience';
import Awards, { AwardItem } from '@/components/home/Awards';
import Services, { ServiceItem } from '@/components/home/Services';
import { Publication } from '@/types/publication';

interface SectionConfig {
  id: string;
  type: 'markdown' | 'publications' | 'list' | 'education' | 'experience' | 'awards' | 'services';
  title?: string;
  source?: string;
}

interface AboutPageConfig {
  type: 'about';
  title: string;
  profile?: { research_interests?: string[]; bio_text?: string };
  sections: SectionConfig[];
}

export default function Home() {
  const config = getConfig();

  const aboutConfig = getPageConfig<AboutPageConfig>('about');
  const profileConfig = aboutConfig?.profile;
  const researchInterests = profileConfig?.research_interests;
  const bioText = profileConfig?.bio_text;
  const sections: SectionConfig[] = aboutConfig?.sections ?? [];

  // Pre-load data for each section on the server
  const renderedSections = sections.map(section => {
    switch (section.type) {
      case 'markdown': {
        const content = section.source ? getMarkdownContent(section.source) : '';
        return (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <About content={content} title={section.title} />
          </section>
        );
      }
      case 'list': {
        const data = section.source ? getTomlContent<{ news: NewsItem[] }>(section.source) : null;
        return (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <News items={data?.news ?? []} title={section.title} />
          </section>
        );
      }
      case 'publications': {
        const bibtex = section.source ? getBibtexContent(section.source) : '';
        const allPubs: Publication[] = parseBibTeX(bibtex);
        return (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <Publications publications={allPubs} title={section.title} />
          </section>
        );
      }
      case 'education': {
        const data = section.source ? getTomlContent<{ items: EducationItem[] }>(section.source) : null;
        return (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <Education items={data?.items ?? []} title={section.title} />
          </section>
        );
      }
      case 'experience': {
        const data = section.source ? getTomlContent<{ items: ExperienceItem[] }>(section.source) : null;
        return (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <Experience items={data?.items ?? []} title={section.title} />
          </section>
        );
      }
      case 'awards': {
        const data = section.source ? getTomlContent<{ items: AwardItem[] }>(section.source) : null;
        return (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <Awards items={data?.items ?? []} title={section.title} />
          </section>
        );
      }
      case 'services': {
        const data = section.source ? getTomlContent<{ items: ServiceItem[] }>(section.source) : null;
        return (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <Services items={data?.items ?? []} title={section.title} />
          </section>
        );
      }
      default:
        return null;
    }
  });

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Left Column - Fixed Profile */}
        <div className="hidden lg:block fixed top-20 w-[280px] py-8">
          <Profile
            author={config.author}
            social={config.social}
            features={{ ...config.features, enable_likes: false }}
            researchInterests={researchInterests}
            bioText={bioText}
          />
        </div>

        {/* Mobile Profile */}
        <div className="lg:hidden py-8">
          <Profile
            author={config.author}
            social={config.social}
            features={{ ...config.features, enable_likes: false }}
            researchInterests={researchInterests}
            bioText={bioText}
          />
        </div>

        {/* Right Column - Scrollable Content */}
        <div className="lg:ml-[320px] py-8">
          <div className="space-y-12">
            {renderedSections}
          </div>
        </div>
      </div>
    </div>
  );
}
