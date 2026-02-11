/**
 * Dashboard Home Page - Player Statistics and Medals
 * 
 * Main dashboard view displaying:
 * - Player statistics (Wins, Losses, Rank Points, Win Rate)
 * - Medal collection (mocked visually - backend logic exists but doesn't return user medals yet)
 * 
 * Note: Medals are visually mocked based on user stats until backend endpoint returns actual medals.
 */
'use client';

import React from 'react';
import { useUserProfile, getUserRank } from '@/hooks/queries/useUserProfile';
import { StatsCard } from '@/components/ui/StatsCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { MedalBadge } from '@/components/profile/MedalBadge';
import { getUserMedals, sortMedalsByStatus, getUnlockedMedalCount } from '@/lib/medals';

export default function DashboardPage() {
  const { data: user, isLoading, error } = useUserProfile();

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-naval-action mx-auto mb-4" />
          <p className="text-naval-text-secondary">Carregando estatísticas...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <span className="text-4xl mb-4 block">⚠️</span>
            <h2 className="text-xl font-bold text-white mb-2">
              Erro ao carregar estatísticas
            </h2>
            <p className="text-naval-text-secondary">
              Não foi possível carregar suas informações. Tente novamente mais tarde.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate derived statistics
  const totalGames = user.gamesPlayed;
  const winRate = totalGames > 0 ? ((user.wins / totalGames) * 100).toFixed(1) : '0.0';
  const rank = getUserRank(user.wins);
  
  // Generate medals based on user statistics (mocked visually)
  const medals = sortMedalsByStatus(getUserMedals(user));
  const unlockedCount = getUnlockedMedalCount(medals);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">
          ⚓ Bem-vindo, {user.username}!
        </h1>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-xl">{rank.icon}</span>
          <span className="text-lg font-semibold text-naval-action">{rank.title}</span>
        </div>
        <p className="text-naval-text-secondary">
          Acompanhe suas estatísticas e conquistas na batalha naval
        </p>
      </div>

      {/* Statistics Grid */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">📊 Estatísticas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            icon="🏆"
            label="Vitórias"
            value={user.wins}
            subtitle="Batalhas vencidas"
            variant="success"
          />
          
          <StatsCard
            icon="💔"
            label="Derrotas"
            value={user.losses}
            subtitle="Batalhas perdidas"
            variant="warning"
          />
          
          <StatsCard
            icon="⭐"
            label="Pontos de Ranking"
            value={user.rankPoints}
            subtitle="Sua pontuação geral"
            variant="primary"
          />
          
          <StatsCard
            icon="📈"
            label="Taxa de Vitória"
            value={`${winRate}%`}
            subtitle={`${totalGames} partidas jogadas`}
            variant="default"
          />
        </div>
      </section>

      {/* Medals Section */}
      <section>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                🏅 Medalhas
              </CardTitle>
              <div className="text-sm text-naval-text-secondary">
                <span className="font-bold text-naval-action">{unlockedCount}</span>
                {' '}de{' '}
                <span className="font-bold">{medals.length}</span>
                {' '}desbloqueadas
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {/* Medal Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {medals.map((medal) => (
                <div key={medal.id} className="flex justify-center">
                  <MedalBadge medal={medal} size="md" />
                </div>
              ))}
            </div>

            {/* Empty State */}
            {medals.length === 0 && (
              <div className="text-center py-8">
                <span className="text-5xl mb-4 block">🎖️</span>
                <p className="text-naval-text-secondary">
                  Nenhuma medalha disponível ainda
                </p>
              </div>
            )}

            {/* Info Note */}
            <div className="mt-6 p-4 rounded-md bg-naval-action/10 border border-naval-action/30">
              <p className="text-sm text-naval-text-secondary">
                <span className="font-bold text-naval-action">💡 Nota:</span> As medalhas são
                calculadas automaticamente com base nas suas estatísticas. Continue jogando para
                desbloquear mais conquistas!
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Actions */}
      <section>
        <div className="flex justify-end">
          <a
            href="/lobby"
            className="px-8 py-4 bg-naval-action hover:bg-naval-action-hover text-white font-bold rounded-md transition-all hover:scale-105 shadow-lg flex items-center gap-2"
          >
            <span className="text-xl">🎮</span>
            <span>Ir para o Lobby</span>
          </a>
        </div>
      </section>
    </div>
  );
}
