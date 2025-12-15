import React, { createContext, useContext, useState, useEffect } from 'react';

interface GameState {
  xp: number;
  level: number;
  completedActivities: string[];
  activityScores: Record<string, number>;
  totalActivities: number;
}

interface GameContextType {
  gameState: GameState;
  completeActivity: (id: string, score: number, maxXp: number) => void;
  resetProgress: () => void;
  isActivityCompleted: (id: string) => boolean;
  getProgressPercentage: () => number;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const ACTIVITIES = {
  'absorb_slides': { id: 'absorb_slides', name: 'Narrated Slideshow', maxXp: 500 },
  'absorb_video': { id: 'absorb_video', name: 'Role-Play Analysis', maxXp: 500 },
  'absorb_scenarios': { id: 'absorb_scenarios', name: 'Written Scenarios', maxXp: 500 },
  'do_flashcards': { id: 'do_flashcards', name: 'Inclusion Terms', maxXp: 750 },
  'do_sim': { id: 'do_sim', name: 'Conversation Sim', maxXp: 1000 },
  'do_sorting': { id: 'do_sorting', name: 'Behavior Sorting', maxXp: 750 },
  'connect_phishing': { id: 'connect_phishing', name: 'Phishing Analysis', maxXp: 1000 },
  'connect_password': { id: 'connect_password', name: 'Password Lab', maxXp: 500 },
  'connect_device': { id: 'connect_device', name: 'Device Safety', maxXp: 1000 },
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('iti_game_state');
    return saved ? JSON.parse(saved) : {
      xp: 0,
      level: 1,
      completedActivities: [],
      activityScores: {},
      totalActivities: Object.keys(ACTIVITIES).length
    };
  });

  useEffect(() => {
    localStorage.setItem('iti_game_state', JSON.stringify(gameState));
  }, [gameState]);

  const completeActivity = (id: string, scorePercentage: number, maxXp: number) => {
    if (gameState.completedActivities.includes(id)) return; // Already completed

    // Calculate XP based on score (must have minimum score to pass, but for this generic logic we scale it)
    // In a strict 90% requirement, we could enforce that here, but let's allow progress but lower XP for lower scores
    const xpEarned = Math.round(maxXp * (scorePercentage / 100));

    setGameState(prev => {
      const newXp = prev.xp + xpEarned;
      // Simple leveling: Level up every 2000 XP
      const newLevel = Math.floor(newXp / 2000) + 1;
      
      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        completedActivities: [...prev.completedActivities, id],
        activityScores: { ...prev.activityScores, [id]: scorePercentage }
      };
    });
  };

  const resetProgress = () => {
    setGameState({
      xp: 0,
      level: 1,
      completedActivities: [],
      activityScores: {},
      totalActivities: Object.keys(ACTIVITIES).length
    });
    localStorage.removeItem('iti_game_state');
  };

  const isActivityCompleted = (id: string) => gameState.completedActivities.includes(id);

  const getProgressPercentage = () => {
    return Math.round((gameState.completedActivities.length / Object.keys(ACTIVITIES).length) * 100);
  };

  return (
    <GameContext.Provider value={{ gameState, completeActivity, resetProgress, isActivityCompleted, getProgressPercentage }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};